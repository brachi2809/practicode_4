using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using TodoApi;
using TodoApi.Models;

var builder = WebApplication.CreateBuilder(args);

// טעינת קובץ ההגדרות
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

// בדיקת מחרוזת החיבור למסד הנתונים
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
Console.WriteLine($"🛠️ Using Connection String: {connectionString}");

// הוספת שירותי CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// חיבור למסד הנתונים
builder.Services.AddDbContext<ToDoDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// הוספת Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// הפעלת CORS
app.UseCors("AllowAll");

// הפעלת Swagger
app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
    options.RoutePrefix = "swagger";  // רק אם ברצונך שהוא יישאר ב-`/swagger`
});

// ✅ **ברירת מחדל (`/`) מחזירה את כל הנתונים**
app.MapGet("/", async (ToDoDbContext db) =>
{
    try
    {
        var items = await db.Items.ToListAsync();
        Console.WriteLine($"🔍 Found {items.Count} items in the database.");

        if (items.Count == 0)
        {
            return Results.NotFound("⚠️ אין נתונים במסד!");
        }

        return Results.Ok(items);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"❌ Database Error: {ex.Message}");
        return Results.Problem("🚨 שגיאה בגישה למסד הנתונים!");
    }
});

// **GET - קבלת כל הפריטים**
app.MapGet("/items", async (ToDoDbContext db) =>
{
    try
    {
        var items = await db.Items.ToListAsync();
        Console.WriteLine($"🔍 Found {items.Count} items in the database.");

        if (items.Count == 0)
        {
            return Results.NotFound("⚠️ אין נתונים במסד!");
        }

        return Results.Ok(items);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"❌ Database Error: {ex.Message}");
        return Results.Problem("🚨 שגיאה בגישה למסד הנתונים!");
    }
});

// **GET - קבלת פריט לפי מזהה**
app.MapGet("/items/{id}", async (int id, ToDoDbContext db) =>
{
    var item = await db.Items.FindAsync(id);
    return item is not null ? Results.Ok(item) : Results.NotFound();
});

// **PUT - עדכון פריט לפי מזהה**
app.MapPut("/items/{id}", async (int id, Item item, ToDoDbContext db) =>
{
    var existingItem = await db.Items.FindAsync(id);
    if (existingItem is null) return Results.NotFound();

    existingItem.IsComplete = item.IsComplete;
    existingItem.Name = item.Name;
    await db.SaveChangesAsync();

    return Results.Ok(existingItem);
});

// **POST - יצירת פריט חדש**
app.MapPost("/items", async (Item item, ToDoDbContext db) =>
{
    var newItem = new Item { IsComplete = 0, Name = item.Name };
    db.Items.Add(newItem);
    await db.SaveChangesAsync();

    return Results.Created($"/items/{newItem.Id}", newItem);
});

// **DELETE - מחיקת פריט לפי מזהה**
app.MapDelete("/items/{id}", async (int id, ToDoDbContext db) =>
{
    var item = await db.Items.FindAsync(id);
    if (item is null) return Results.NotFound();

    db.Items.Remove(item);
    await db.SaveChangesAsync();

    return Results.Ok();
});

app.Run();

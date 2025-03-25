using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using TodoApi;
using TodoApi.Models;


var builder = WebApplication.CreateBuilder(args);

// טעינת קובץ appsettings.json
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

// בדיקת מחרוזת החיבור
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
Console.WriteLine($"Using Connection String: {connectionString}");

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// SWAGGER
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// חיבור למסד הנתונים
builder.Services.AddDbContext<ToDoDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"), ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))));

var app = builder.Build();

// CORS
app.UseCors("AllowAll");

// SWAGGER
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        options.RoutePrefix = string.Empty;
    });
}

// GET all items
app.MapGet("/items", async (ToDoDbContext db) =>
{
    return await db.Items.ToListAsync();
});

// GET item by ID
app.MapGet("/items/{id}", async (int id, ToDoDbContext db) =>
{
    var item = await db.Items.FindAsync(id);
    return item is not null ? Results.Ok(item) : Results.NotFound();
});

// UPDATE (PUT) item
app.MapPut("/items/{id}", async (int id, Item item, ToDoDbContext db) =>
{
    var existingItem = await db.Items.FindAsync(id);
    if (existingItem is null) return Results.NotFound();

    existingItem.IsComplete = item.IsComplete;
    existingItem.Name = item.Name;
    await db.SaveChangesAsync();

    return Results.Ok(existingItem);
});

// CREATE new item
app.MapPost("/items", async (Item item, ToDoDbContext db) =>
{
    var newItem = new Item { IsComplete = 0, Name = item.Name };
    db.Items.Add(newItem);
    await db.SaveChangesAsync();

    return Results.Created($"/items/{newItem.Id}", newItem);
});

// DELETE item
app.MapDelete("/items/{id}", async (int id, ToDoDbContext db) =>
{
    var item = await db.Items.FindAsync(id);
    if (item is null) return Results.NotFound();

    db.Items.Remove(item);
    await db.SaveChangesAsync();

    return Results.Ok();
});

// בדיקה אם השרת רץ
app.MapGet("/", () => "Server is running!");

app.Run();

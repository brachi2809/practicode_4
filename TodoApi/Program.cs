using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using TodoApi;
// using ToDoDbContext;

var builder = WebApplication.CreateBuilder(args);
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

builder.Services.AddDbContext<ToDoDbContext>(options => options.UseMySql(builder.Configuration.GetConnectionString("ToDoDb"),
    ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("ToDoDb"))));
var app = builder.Build();
// CORS
app.UseCors("AllowAll");
// SWAGGER
if (builder.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options => // UseSwaggerUI is called only in Development.
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        options.RoutePrefix = string.Empty;
    });
}
//get all
app.MapGet("/items",async (ToDoDbContext db) => {
    var items = await db.Items.ToListAsync();
    return items;
});
//get by id
app.MapGet("/items/{id}",async (int id , ToDoDbContext db) => {
    var item = await db.Items.FindAsync(id);
    return item;
});
//update is complited
app.MapPost("/items/{id}", async (int id, Item item, ToDoDbContext db) => {
    var result = await db.Items.FindAsync(id);
    if (result == null) return Results.NotFound();
    result.IsComplete = item.IsComplete;
    await db.SaveChangesAsync();
    return Results.Ok();
});

// put new item
app.MapPut("/items", async (Item item, ToDoDbContext db) =>
{
    var newItem = new Item { IsComplete = 0, Name = item.Name };
    db.Items.Add(newItem);
    await db.SaveChangesAsync();
    return Results.Ok();
});

// delete item

app.MapDelete("/items/{id}", async (int id, ToDoDbContext db) => {
    var item = await db.Items.FindAsync(id);
    if (item == null) return Results.NotFound();
    db.Items.Remove(item);
    await db.SaveChangesAsync();
    return Results.Ok();
});
// app.MapGet("/", () => "hello world");
app.Run();

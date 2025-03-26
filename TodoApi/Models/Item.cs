namespace TodoApi.Models
{
    public class Item
{
    public int Id { get; set; }
    public int IsComplete { get; set; }
    public string? Name { get; set; } // 👈 הוספת `?` מאפשרת ערכים ריקים
}

}

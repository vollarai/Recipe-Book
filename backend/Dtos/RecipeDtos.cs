using System;

namespace backend.Dtos
{
    public class RecipeCreateDto
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Ingredients { get; set; }
        public string? Steps { get; set; }
    }

    public class RecipeUpdateDto
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Ingredients { get; set; }
        public string? Steps { get; set; }
    }

    public class RecipeResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Ingredients { get; set; }
        public string? Steps { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}

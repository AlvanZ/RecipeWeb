import React, { useState } from "react";
import "../index.css";

function MainPage() {
  const [dietaryNeeds, setDietaryNeeds] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  setRecipe(""); // Clear previous data

  try {
      // Make sure the request body is properly formatted
      const response = await fetch("https://d2swv63fp36x2kcb2cagikki2m0jwwjc.lambda-url.us-west-1.on.aws/", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              dietaryNeeds: dietaryNeeds, // Make sure this variable is correctly populated
          }),
      });

      if (!response.ok) throw new Error("Failed to fetch recipe.");

      const data = await response.json();
      setRecipe(data.recipe || "No recipe found.");
  } catch (err) {
      console.error("Error fetching recipe:", err);
      setError(err.message);
  } finally {
      setLoading(false);
  }
};
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg border">
        {/* Card Header */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-center">Recipe Generator</h2>
          <p className="text-gray-600 mt-2 text-center">
            Enter dietary needs to get a personalized AI-powered recipe!
          </p>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter dietary needs (e.g., vegan, keto)"
              value={dietaryNeeds}
              onChange={(e) => setDietaryNeeds(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              {loading ? "Generating..." : "Get Recipe"}
            </button>
          </form>
        </div>

        {/* Recipe Output */}
        {error && (
          <div className="p-6 text-red-500">
            <p>Error: {error}</p>
          </div>
        )}
        {recipe && (
          <div className="p-6 border-t border-gray-300">
            <h3 className="text-lg font-bold">Generated Recipe:</h3>
            <div className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">{recipe.replace(/\*/g, "")}</div>
          </div>
        )}

        {/* Card Footer */}
        <div className="p-4 bg-gray-100 text-sm text-center text-gray-500">
          Powered by Groq LPU
        </div>
      </div>
    </div>
  );
}

export default MainPage;

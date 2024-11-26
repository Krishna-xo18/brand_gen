import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
const BrandNameGenerator = () => {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyA6Y31gvB_0wi8AWWw-FWXHlKA57h6mqOk"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
  const [formData, setFormData] = useState({
    slogan: "",
    industry: "",
    currentName: "",
    targetAgeGroup: "",
    category: "",
    keywords: "",
    values: "",
  });

  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateBrandNames = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const prompt = `Generate 5 unique and memorable brand names based on the following information:
      Company Slogan/Motive: ${formData.slogan}
      Industry/Business Type: ${formData.industry}
      Current Brand Name (if any): ${formData.currentName}
      Target Age Group: ${formData.targetAgeGroup}
      Brand Category: ${formData.category}
      Key Terms/Concepts: ${formData.keywords}
      Company Values: ${formData.values}

      For each brand name suggestion, provide:
      1. The brand name
      2. Brief explanation of its meaning/relevance
      3. Why it would resonate with the target audience
      
      Format each suggestion clearly and concisely.`;

      // Placeholder for API call

      const result = await model.generateContent(prompt);
      const response = await result.response.text();
      setGeneratedText(response);
    } catch (err) {
      console.error("Generation error:", err);
      setError(`Failed to generate suggestions: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={generateBrandNames} className="form">
        <div className="header">
          <h2>Brand Name Generator</h2>
          <p>Create unique and memorable brand names for your business</p>
        </div>

        <div className="form-group">
          <label>Company Slogan or Mission Statement</label>
          <textarea
            name="slogan"
            value={formData.slogan}
            onChange={handleInputChange}
            placeholder="Enter your company's slogan or mission statement"
            required
          />
        </div>

        <div className="form-group">
          <label>Industry/Business Type</label>
          <input
            name="industry"
            type="text"
            value={formData.industry}
            onChange={handleInputChange}
            placeholder="e.g., Technology, Food & Beverage, Fashion"
            required
          />
        </div>

        <div className="form-group">
          <label>Current Brand Name (if any)</label>
          <input
            name="currentName"
            type="text"
            value={formData.currentName}
            onChange={handleInputChange}
            placeholder="Leave empty if this is a new brand"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Target Age Group</label>
            <select
              name="targetAgeGroup"
              value={formData.targetAgeGroup}
              onChange={handleInputChange}
              required
            >
              <option value="">Select target age group</option>
              <option value="Gen-Z (Under 25)">Gen-Z (Under 25)</option>
              <option value="Millennials (25-40)">Millennials (25-40)</option>
              <option value="Gen-X (41-56)">Gen-X (41-56)</option>
              <option value="Baby Boomers (57+)">Baby Boomers (57+)</option>
              <option value="All Ages">All Ages</option>
            </select>
          </div>

          <div className="form-group">
            <label>Brand Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select brand category</option>
              <option value="Luxury">Luxury</option>
              <option value="Premium">Premium</option>
              <option value="Mid-range">Mid-range</option>
              <option value="Budget">Budget</option>
              <option value="Economy">Economy</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Key Terms/Concepts</label>
          <textarea
            name="keywords"
            value={formData.keywords}
            onChange={handleInputChange}
            placeholder="Enter keywords that describe your brand (separated by commas)"
            required
          />
        </div>

        <div className="form-group">
          <label>Company Values</label>
          <textarea
            name="values"
            value={formData.values}
            onChange={handleInputChange}
            placeholder="What are your company's core values?"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={loading ? "button loading" : "button"}
        >
          {loading ? (
            <span className="button-content">
              <div className="spinner"></div>
              Generating...
            </span>
          ) : (
            "Generate Brand Name Suggestions"
          )}
        </button>

        {error && <div className="error">{error}</div>}

        {generatedText && (
          <div className="results">
            <h3>Generated Brand Names:</h3>
            <div className="result-text">{generatedText}</div>
          </div>
        )}
      </form>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 2rem;
          background: linear-gradient(135deg, #f0f4ff 0%, #e6eeff 100%);
        }

        .form {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .header h2 {
          font-size: 2rem;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
        }

        .header p {
          color: #666;
          font-size: 1rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: #333;
        }

        input,
        select,
        textarea {
          width: 100%;
          padding: 0.75rem;
          font-size: 1rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          background-color: white;
          transition: all 0.2s ease;
        }

        input:focus,
        select:focus,
        textarea:focus {
          outline: none;
          border-color: #4a90e2;
          box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
        }

        textarea {
          min-height: 100px;
          resize: vertical;
        }

        .button {
          width: 100%;
          padding: 1rem;
          font-size: 1rem;
          font-weight: 600;
          color: white;
          background-color: #4a90e2;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .button:hover:not(:disabled) {
          background-color: #357abd;
        }

        .button:disabled {
          background-color: #a0c4e7;
          cursor: not-allowed;
        }

        .button-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .error {
          margin-top: 1rem;
          padding: 1rem;
          background-color: #fff2f2;
          border: 1px solid #ffcdd2;
          border-radius: 6px;
          color: #d32f2f;
        }

        .results {
          margin-top: 2rem;
          padding: 1.5rem;
          background-color: #f8f9fa;
          border-radius: 6px;
        }

        .results h3 {
          font-size: 1.25rem;
          color: #333;
          margin-bottom: 1rem;
        }

        .result-text {
          white-space: pre-line;
          line-height: 1.6;
          color: #444;
        }

        ::placeholder {
          color: #999;
        }

        @media (max-width: 640px) {
          .container {
            padding: 1rem;
          }

          .form {
            padding: 1.5rem;
          }

          .header h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default BrandNameGenerator;

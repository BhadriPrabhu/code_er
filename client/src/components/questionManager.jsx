import React, { useState } from 'react';

export default function QuestionManager({ availableSets, form, setForm, handleReplaceQSet, handleDeleteQSet }) {
  // 1. Manage Set-level details
  const [setKey, setSetKey] = useState('');
  const [setDesc, setSetDesc] = useState('');

  // 2. Manage the dynamic array of questions
  const [questions, setQuestions] = useState([
    {
      language: 'C',
      title: '',
      buggy_code: '',
      expected_output: '',
      evaluation_answers: '' // We will accept comma-separated strings and parse to JSON later
    }
  ]);

  // Handle changes for a specific question block
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  // Add a new blank question to the form
  const addQuestionField = () => {
    setQuestions([
      ...questions,
      { language: 'C', title: '', buggy_code: '', expected_output: '', evaluation_answers: '' }
    ]);
  };

  // Remove a question from the form
  const removeQuestionField = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  // 3. Handle Form Submission
  const handleCreateQSet = (e) => {
    e.preventDefault();

    // Transform the form data into the exact payload your backend expects
    const finalPayload = questions.map((q, idx) => ({
      ...q,
      question_index: idx + 1, // Auto-generate sequential index
      // Safely split comma-separated strings into an array, trimming whitespace
      evaluation_answers: q.evaluation_answers 
        ? q.evaluation_answers.split(',').map(ans => ans.trim()) 
        : []
    }));

    const dataToSend = {
      key: setKey,
      desc: setDesc,
      questions: finalPayload
    };

    console.log("Submitting to backend:", dataToSend);
    // TODO: Await your API call here
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-10 max-w-6xl mx-auto shadow-lg grid grid-cols-1 lg:grid-cols-3 gap-8 border border-gray-700">
      
      {/* ====== CREATE COLUMN (Takes up more space now) ====== */}
      <div className="lg:col-span-2">
        <h2 className="text-xl mb-4 font-semibold text-cyan-400">Create New Question Set</h2>
        
        <form onSubmit={handleCreateQSet} className="flex flex-col gap-6 text-black">
          {/* Set Metadata */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Set Key (e.g., questionSet2)"
              value={setKey}
              onChange={(e) => setSetKey(e.target.value)}
              className="p-2 rounded bg-white text-black border w-1/3"
              required
            />
            <input
              type="text"
              placeholder="Short Description"
              value={setDesc}
              onChange={(e) => setSetDesc(e.target.value)}
              className="p-2 rounded bg-white text-black border flex-grow"
            />
          </div>

          <hr className="border-gray-600" />

          {/* Dynamic Questions Mapping */}
          <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
            {questions.map((q, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-md border border-gray-600 relative">
                <h3 className="text-cyan-300 font-semibold mb-3 flex justify-between">
                  <span>Question {index + 1}</span>
                  {questions.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeQuestionField(index)}
                      className="text-red-400 text-sm hover:text-red-300"
                    >
                      Remove
                    </button>
                  )}
                </h3>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <select
                    value={q.language}
                    onChange={(e) => handleQuestionChange(index, 'language', e.target.value)}
                    className="p-2 rounded bg-white text-black border"
                  >
                    <option value="C">C</option>
                    <option value="Python">Python</option>
                    <option value="JavaScript">JavaScript</option>
                  </select>
                  
                  <input
                    type="text"
                    placeholder="Question Title (e.g., Pattern Printing)"
                    value={q.title}
                    onChange={(e) => handleQuestionChange(index, 'title', e.target.value)}
                    className="p-2 rounded bg-white text-black border"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <textarea
                    placeholder="Buggy Code Snippet..."
                    value={q.buggy_code}
                    onChange={(e) => handleQuestionChange(index, 'buggy_code', e.target.value)}
                    className="p-2 rounded font-mono text-sm h-24 bg-gray-900 text-green-400 border border-gray-600 focus:outline-none focus:border-cyan-500"
                    required
                  />
                  <textarea
                    placeholder="Expected Output..."
                    value={q.expected_output}
                    onChange={(e) => handleQuestionChange(index, 'expected_output', e.target.value)}
                    className="p-2 rounded font-mono text-sm h-24 bg-gray-900 text-green-400 border border-gray-600 focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>

                <input
                  type="text"
                  placeholder="Evaluation Answers (Comma separated, e.g., i=0, j<5, return 1)"
                  value={q.evaluation_answers}
                  onChange={(e) => handleQuestionChange(index, 'evaluation_answers', e.target.value)}
                  className="p-2 rounded bg-white text-black border w-full text-sm"
                />
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-2">
            <button 
              type="button" 
              onClick={addQuestionField}
              className="bg-gray-600 px-4 py-2 rounded text-white font-semibold hover:bg-gray-500 flex-grow"
            >
              + Add Another Question
            </button>
            
            <button 
              type="submit" 
              className="bg-cyan-600 px-8 py-2 rounded text-white font-semibold hover:bg-cyan-700"
            >
              Deploy Question Set
            </button>
          </div>
        </form>
      </div>

      {/* ====== MODIFY / DELETE COLUMN ====== */}
      <div className="flex flex-col border-t lg:border-t-0 lg:border-l border-gray-700 pt-6 lg:pt-0 lg:pl-6">
        <div>
          <h2 className="text-xl mb-4 font-semibold text-red-400">Modify / Terminate Sets</h2>
          <p className="text-sm text-gray-400 mb-4">Select a set from your backend system database to safely wipe it entirely.</p>
          
          <select
            value={form?.questionSet || ''}
            onChange={(e) => setForm({ ...form, questionSet: e.target.value })}
            className="p-2 rounded w-full text-black mb-6"
          >
            <option value="">Select Question Set...</option>
            {availableSets?.map((s) => (
              <option key={s.id} value={s.set_key}>{s.set_key}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-3 mt-auto">
          <button
            onClick={handleReplaceQSet}
            className="bg-yellow-600 p-2 rounded text-white font-semibold hover:bg-yellow-700"
          >
            Replace Content Payload
          </button>
          <button
            onClick={handleDeleteQSet}
            className="bg-red-600 p-2 rounded text-white font-semibold hover:bg-red-700"
          >
            Delete Set Permanently
          </button>
        </div>
      </div>

    </div>
  );
}
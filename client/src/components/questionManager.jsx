import React, { useState } from 'react';
import api from '../api/api';

export default function QuestionManager({ availableSets, form, setForm, handleReplaceQSet, handleDeleteQSet, fetchQuestionSets }) {
  // --- UI State ---
  const [activeTab, setActiveTab] = useState('create'); // 'create' | 'replace'

  // --- Form State ---
  const [setKey, setSetKey] = useState('');
  const [setDesc, setSetDesc] = useState('');
  const [questions, setQuestions] = useState([
    {
      language: 'C',
      title: '',
      buggy_code: '',
      expected_output: '',
      evaluation_answers: ''
    }
  ]);

  const [allottedDuration, setAllottedDuration] = useState('');

  // --- Handlers ---
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const addQuestionField = () => {
    setQuestions([
      ...questions,
      { language: 'C', title: '', buggy_code: '', expected_output: '', evaluation_answers: '' }
    ]);
  };

  const removeQuestionField = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const generatePayload = () => {
    return questions.map((q, idx) => ({
      ...q,
      question_index: idx + 1,
      evaluation_answers: q.evaluation_answers
        ? q.evaluation_answers.split(',').map(ans => ans.trim())
        : []
    }));
  };

  const resetForm = () => {
    setSetKey('');
    setSetDesc('');
    setQuestions([{ language: 'C', title: '', buggy_code: '', expected_output: '', evaluation_answers: '' }]);
    setForm({ ...form, questionSet: '', startTime: '', endTime: '' });
    setAllottedDuration('');
  };

  // --- Submit Handlers ---
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      set_key: setKey,
      description: setDesc,
      questions: generatePayload(),
      start_time: form.startTime || "",
      end_time: form.endTime || "",
      allotted_duration: allottedDuration || ""
    };

    console.log("Submitting to backend:", dataToSend);
    try {
      const response = await api.post("/admin/create-qset", dataToSend);
      console.log("Backend response:", response.message);
      alert("Question set created successfully!");
      resetForm();

      if (fetchQuestionSets) fetchQuestionSets();
    } catch (err) {
      console.error("Error submitting question set:", err);
      alert("Failed to create question set!");
    }
  };

  const handleReplaceSubmit = async (e) => {
    e.preventDefault();
    if (!form?.questionSet) {
      alert("Please select a question set to replace!");
      return;
    }

    const dataToSend = {
      set_key: form.questionSet,
      questions: generatePayload(),
      start_time: form.startTime || "",
      end_time: form.endTime || "",
      allotted_duration: allottedDuration || ""
    };

    // Assuming handleReplaceQSet in the parent can take this data as an argument,
    // or you can fire your API call directly here just like in Create.
    await handleReplaceQSet(dataToSend);
    resetForm();
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-10 max-w-6xl mx-auto shadow-lg grid grid-cols-1 lg:grid-cols-3 gap-8 border border-gray-700">

      {/* ====== MAIN COLUMN (Create or Replace Form) ====== */}
      <div className="lg:col-span-2">

        {/* View Toggles */}
        <div className="flex gap-6 mb-6 border-b border-gray-600 pb-3">
          <button
            onClick={() => setActiveTab('create')}
            className={`text-lg font-semibold transition-colors ${activeTab === 'create' ? 'text-cyan-400 border-b-2 border-cyan-400 pb-1' : 'text-gray-400 hover:text-gray-300'
              }`}
          >
            Create New Set
          </button>
          <button
            onClick={() => setActiveTab('replace')}
            className={`text-lg font-semibold transition-colors ${activeTab === 'replace' ? 'text-yellow-400 border-b-2 border-yellow-400 pb-1' : 'text-gray-400 hover:text-gray-300'
              }`}
          >
            Replace Existing Set
          </button>
        </div>

        <form onSubmit={activeTab === 'create' ? handleCreateSubmit : handleReplaceSubmit} className="flex flex-col gap-6 text-black">

          {/* Metadata Block depending on Mode */}
          <div className="flex gap-4">
            {activeTab === 'create' ? (
              <input
                type="text"
                placeholder="Set Key (e.g., questionSet2)"
                value={setKey}
                onChange={(e) => setSetKey(e.target.value)}
                className="p-2 rounded bg-white text-black border w-1/3 focus:outline-none focus:border-cyan-500"
                required
              />
            ) : (
              <select
                value={form?.questionSet || ''}
                onChange={(e) => setForm({ ...form, questionSet: e.target.value })}
                className="p-2 rounded bg-white text-black border w-1/3 focus:outline-none focus:border-yellow-500"
                required
              >
                <option value="">Select Set to Replace...</option>
                {availableSets?.map((s) => (
                  <option key={s.id} value={s.set_key}>{s.set_key}</option>
                ))}
              </select>
            )}

            <input
              type="text"
              placeholder="Short Description (Optional)"
              value={setDesc}
              onChange={(e) => setSetDesc(e.target.value)}
              className="p-2 rounded bg-white text-black border flex-grow"
            />
          </div>
          <div className="flex gap-3 w-full">
            <div className="w-1/3 flex flex-col">
              <label className="text-xs text-gray-300 mb-1">Start Time</label>
              <input
                type="datetime-local"
                value={form.startTime || ""}
                onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                className="p-2 rounded text-black"
              />
            </div>
            <div className="w-1/3 flex flex-col">
              <label className="text-xs text-gray-300 mb-1">End Time</label>
              <input
                type="datetime-local"
                value={form.endTime || ""}
                onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                className="p-2 rounded text-black"
              />
            </div>
            <div className="w-1/3 flex flex-col">
              <label className="text-xs text-gray-300 mb-1">Allotted Duration (mins)</label>
              <input
                type="number"
                placeholder="e.g., 60"
                value={allottedDuration}
                onChange={(e) => setAllottedDuration(e.target.value)}
                className="p-2 rounded bg-white text-black border focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <hr className="border-gray-600" />

          {/* Dynamic Questions Mapping (Shared across both modes) */}
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
              className={`${activeTab === 'create' ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-yellow-600 hover:bg-yellow-700'} px-8 py-2 rounded text-white font-semibold`}
            >
              {activeTab === 'create' ? 'Deploy Question Set' : 'Overwrite Existing Set'}
            </button>
          </div>
        </form>
      </div>

      {/* ====== DELETE COLUMN (Simplified) ====== */}
      <div className="flex flex-col border-t lg:border-t-0 lg:border-l border-gray-700 pt-6 lg:pt-0 lg:pl-6">
        <div>
          <h2 className="text-xl mb-4 font-semibold text-red-400">Terminate Sets</h2>
          <p className="text-sm text-gray-400 mb-4">Select a set from your backend system database to safely wipe it entirely.</p>

          <select
            value={form?.questionSet || ''}
            onChange={(e) => setForm({ ...form, questionSet: e.target.value })}
            className="p-2 rounded w-full text-black mb-6"
          >
            <option value="">Select Question Set to Delete</option>
            {availableSets?.map((s) => (
              <option key={s.id} value={s.set_key}>{s.set_key}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-3 mt-auto">
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
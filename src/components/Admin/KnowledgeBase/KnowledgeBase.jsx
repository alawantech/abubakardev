import { useState, useEffect } from "react";
import {
  getCategories,
  getEntries,
  createCategory,
  updateCategory,
  deleteCategory,
  createEntry,
  updateEntry,
  deleteEntry,
  seedDefaultCategories,
} from "./knowledgeBaseService";
import "./KnowledgeBase.css";

function KnowledgeBase() {
  const [categories, setCategories] = useState([]);
  const [entries, setEntries] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [editingEntry, setEditingEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadAll() {
    setLoading(true);
    try {
      let cats = await getCategories();
      if (cats.length === 0) {
        cats = await seedDefaultCategories();
      }
      const ents = await getEntries();
      setCategories(cats);
      setEntries(ents);
      if (cats.length > 0 && !selectedCategoryId) {
        setSelectedCategoryId(cats[0].id);
      }
    } catch (err) {
      console.error("Failed to load knowledge base:", err);
      alert("Failed to load knowledge base. Check Firestore rules.");
    } finally {
      setLoading(false);
    }
  }

  const filteredEntries = entries
    .filter((e) => e.categoryId === selectedCategoryId)
    .filter((e) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (e.title || "").toLowerCase().includes(q) || (e.content || "").toLowerCase().includes(q);
    });

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId);

  // --- Category CRUD ---

  async function handleNewCategory() {
    const title = prompt("Category name (e.g., 'Refund Policy'):");
    if (!title) return;
    const id = await createCategory({ title, icon: "📁", order: Date.now() });
    await loadAll();
    setSelectedCategoryId(id);
  }

  async function handleEditCategory(cat) {
    const title = prompt("Edit category name:", cat.title);
    if (!title || title === cat.title) return;
    await updateCategory(cat.id, { title });
    await loadAll();
  }

  async function handleDeleteCategory(cat) {
    if (!confirm(`Delete "${cat.title}" and ALL its entries? This cannot be undone.`)) return;
    await deleteCategory(cat.id);
    setSelectedCategoryId(null);
    await loadAll();
  }

  // --- Entry CRUD ---

  function handleNewEntry() {
    if (!selectedCategoryId) {
      alert("Please select a category first.");
      return;
    }
    setEditingEntry({ categoryId: selectedCategoryId, title: "", content: "", tags: [] });
  }

  async function handleSaveEntry(entry) {
    if (!entry.title.trim()) {
      alert("Entry title is required.");
      return;
    }
    if (entry.id) {
      await updateEntry(entry.id, {
        title: entry.title,
        content: entry.content,
        tags: entry.tags,
        categoryId: entry.categoryId,
      });
    } else {
      await createEntry({
        title: entry.title,
        content: entry.content,
        tags: entry.tags,
        categoryId: entry.categoryId,
        order: Date.now(),
      });
    }
    setEditingEntry(null);
    await loadAll();
  }

  async function handleDeleteEntry(entry) {
    if (!confirm(`Delete entry "${entry.title}"?`)) return;
    await deleteEntry(entry.id);
    await loadAll();
  }

  // --- Render ---

  if (loading) {
    return (
      <div className="kb-loading">
        <div className="spinner"></div>
        <p>Loading knowledge base...</p>
      </div>
    );
  }

  return (
    <div className="kb-container">
      {/* Sidebar: Categories */}
      <aside className="kb-sidebar">
        <div className="kb-sidebar-header">
          <h2>📚 Knowledge Base</h2>
          <button className="kb-btn-primary kb-btn-sm" onClick={handleNewCategory}>
            + Category
          </button>
        </div>
        <div className="kb-search-box">
          <input
            type="text"
            placeholder="Search entries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="kb-search-input"
          />
        </div>
        <nav className="kb-category-list">
          {categories.map((cat) => {
            const count = entries.filter((e) => e.categoryId === cat.id).length;
            return (
              <div
                key={cat.id}
                className={`kb-category-item ${selectedCategoryId === cat.id ? "active" : ""}`}
                onClick={() => setSelectedCategoryId(cat.id)}
              >
                <span className="kb-category-icon">{cat.icon || "📁"}</span>
                <span className="kb-category-title">{cat.title}</span>
                <span className="kb-category-count">{count}</span>
                <div className="kb-category-actions">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditCategory(cat);
                    }}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCategory(cat);
                    }}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main: Entries */}
      <main className="kb-main">
        {selectedCategory ? (
          <>
            <div className="kb-main-header">
              <div>
                <h1>
                  {selectedCategory.icon} {selectedCategory.title}
                </h1>
                {selectedCategory.description && (
                  <p className="kb-category-description">{selectedCategory.description}</p>
                )}
              </div>
              <button className="kb-btn-primary" onClick={handleNewEntry}>
                + New Entry
              </button>
            </div>

            {filteredEntries.length === 0 ? (
              <div className="kb-empty">
                <p>No entries in this category yet.</p>
                <button className="kb-btn-primary" onClick={handleNewEntry}>
                  + Add First Entry
                </button>
              </div>
            ) : (
              <div className="kb-entry-grid">
                {filteredEntries.map((entry) => (
                  <div key={entry.id} className="kb-entry-card">
                    <div className="kb-entry-card-header">
                      <h3>{entry.title}</h3>
                      <div className="kb-entry-actions">
                        <button onClick={() => setEditingEntry(entry)} title="Edit">
                          ✏️
                        </button>
                        <button onClick={() => handleDeleteEntry(entry)} title="Delete">
                          🗑️
                        </button>
                      </div>
                    </div>
                    <div className="kb-entry-preview">
                      {entry.content
                        ? entry.content.substring(0, 200) + (entry.content.length > 200 ? "..." : "")
                        : <em>Empty</em>}
                    </div>
                    {entry.tags && entry.tags.length > 0 && (
                      <div className="kb-entry-tags">
                        {entry.tags.map((tag, i) => (
                          <span key={i} className="kb-tag">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="kb-empty">
            <p>Select a category to view entries, or create one to get started.</p>
          </div>
        )}
      </main>

      {/* Entry editor modal */}
      {editingEntry && (
        <EntryEditor
          entry={editingEntry}
          categories={categories}
          onSave={handleSaveEntry}
          onCancel={() => setEditingEntry(null)}
        />
      )}
    </div>
  );
}

/* eslint-disable react/prop-types */
function EntryEditor({ entry, categories, onSave, onCancel }) {
  const [title, setTitle] = useState(entry.title || "");
  const [content, setContent] = useState(entry.content || "");
  const [categoryId, setCategoryId] = useState(entry.categoryId || "");
  const [tagsInput, setTagsInput] = useState((entry.tags || []).join(", "));

  return (
    <div className="kb-modal-overlay" onClick={onCancel}>
      <div className="kb-modal" onClick={(e) => e.stopPropagation()}>
        <div className="kb-modal-header">
          <h2>{entry.id ? "Edit Entry" : "New Entry"}</h2>
          <button onClick={onCancel} className="kb-modal-close">×</button>
        </div>
        <div className="kb-modal-body">
          <label className="kb-label">
            Title
            <input
              type="text"
              className="kb-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Web Application Development"
              autoFocus
            />
          </label>
          <label className="kb-label">
            Category
            <select
              className="kb-input"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.title}
                </option>
              ))}
            </select>
          </label>
          <label className="kb-label">
            Tags <span className="kb-hint">(comma-separated, optional)</span>
            <input
              type="text"
              className="kb-input"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="web, react, pricing"
            />
          </label>
          <label className="kb-label">
            Content
            <textarea
              className="kb-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write the knowledge the AI should use when answering questions about this topic..."
              rows={14}
            />
          </label>
          <div className="kb-char-count">
            {content.length} characters · ~{Math.ceil(content.length / 4)} tokens
          </div>
        </div>
        <div className="kb-modal-footer">
          <button className="kb-btn-secondary" onClick={onCancel}>Cancel</button>
          <button
            className="kb-btn-primary"
            onClick={() =>
              onSave({
                ...entry,
                title: title.trim(),
                content: content.trim(),
                categoryId,
                tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
              })
            }
          >
            {entry.id ? "Save Changes" : "Create Entry"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default KnowledgeBase;

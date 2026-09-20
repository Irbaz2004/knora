import { useEffect, useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ImagePlus, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { db, storage } from "@/firebase";
import { CMS_PAGES, EMPTY_CMS_PAGE, getCmsPage } from "@/lib/cms";
import WebsiteSettingsLayout from "../layouts/WebsiteSettingsLayout";

const newItem = () => ({
  id: crypto.randomUUID(),
  title: "",
  meta: "",
  description: "",
  imageUrl: "",
});

export default function ContentManagement({ profile }) {
  const [pageId, setPageId] = useState("home");
  const [form, setForm] = useState(EMPTY_CMS_PAGE);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const page = CMS_PAGES.find((item) => item.id === pageId);

  useEffect(() => {
    setLoading(true);
    getCmsPage(pageId).then((data) => {
      setForm(data);
      setLoading(false);
    });
  }, [pageId]);

  const update = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));
  const updateItem = (index, key, value) =>
    setForm((current) => ({
      ...current,
      items: current.items.map((item, i) =>
        i === index ? { ...item, [key]: value } : item,
      ),
    }));

  const upload = async (file, itemIndex = null) => {
    if (!storage) return toast.error("Firebase Storage is not configured.");
    if (!file?.type.startsWith("image/"))
      return toast.error("Please select an image file.");
    const objectRef = ref(
      storage,
      `cms/${pageId}/${Date.now()}-${file.name.replace(/[^a-z0-9._-]/gi, "-")}`,
    );
    const result = await uploadBytes(objectRef, file);
    const url = await getDownloadURL(result.ref);
    if (itemIndex === null) update("imageUrl", url);
    else updateItem(itemIndex, "imageUrl", url);
    toast.success("Image uploaded. Save the page to publish it.");
  };

  const save = async (event) => {
    event.preventDefault();
    if (!db) return toast.error("Firebase is not configured.");
    setSaving(true);
    try {
      await setDoc(
        doc(db, "websiteContent", pageId),
        {
          ...form,
          pageId,
          path: page.path,
          updatedAt: serverTimestamp(),
          updatedBy: profile?.email || "superadmin",
        },
        { merge: true },
      );
      toast.success(`${page.label} content saved.`);
    } catch (error) {
      toast.error(error.message || "Could not save content.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <WebsiteSettingsLayout
      profile={profile}
      pageId={pageId}
      onPageChange={setPageId}
      title={`${page.label} Settings`}
      description="Edit and publish this website page from Firebase."
    >
      <div className="cms-admin-layout cms-admin-single">
        <form className="crm-card cms-editor" onSubmit={save}>
          <div className="cms-editor-heading">
            <div>
              <h2>{page.label}</h2>
              <p>
                Changes appear on{" "}
                <a href={page.path} target="_blank" rel="noreferrer">
                  {page.path}
                </a>{" "}
                after saving.
              </p>
            </div>
            <label className="cms-publish">
              <input
                type="checkbox"
                checked={form.enabled}
                onChange={(e) => update("enabled", e.target.checked)}
              />{" "}
              Published
            </label>
          </div>
          {loading ? (
            <p>Loading content…</p>
          ) : (
            <>
              <div className="cms-form-grid">
                <label>
                  Eyebrow
                  <input
                    value={form.eyebrow}
                    onChange={(e) => update("eyebrow", e.target.value)}
                    placeholder="KNORA ACADEMY"
                  />
                </label>
                <label>
                  Page title
                  <input
                    value={form.title}
                    onChange={(e) => update("title", e.target.value)}
                    placeholder={`${page.label} title`}
                  />
                </label>
                <label className="full">
                  Subtitle
                  <input
                    value={form.subtitle}
                    onChange={(e) => update("subtitle", e.target.value)}
                  />
                </label>
                <label className="full">
                  Description
                  <textarea
                    rows="5"
                    value={form.body}
                    onChange={(e) => update("body", e.target.value)}
                  />
                </label>
                <label>
                  Image alt text
                  <input
                    value={form.imageAlt || ""}
                    onChange={(e) => update("imageAlt", e.target.value)}
                  />
                </label>
                <label>
                  Hero image URL
                  <input
                    value={form.imageUrl}
                    onChange={(e) => update("imageUrl", e.target.value)}
                  />
                </label>
              </div>
              <label className="cms-upload">
                <ImagePlus /> Upload hero image
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => upload(e.target.files[0])}
                />
              </label>
              {form.imageUrl && (
                <img
                  className="cms-image-preview"
                  src={form.imageUrl}
                  alt="Preview"
                />
              )}
              <div className="cms-items-heading">
                <div>
                  <h3>
                    {pageId === "testimonials"
                      ? "Testimonials"
                      : pageId === "gallery"
                        ? "Gallery images"
                        : "Content cards"}
                  </h3>
                  <p>Add repeatable content blocks when needed.</p>
                </div>
                <button
                  type="button"
                  className="crm-primary"
                  onClick={() => update("items", [...form.items, newItem()])}
                >
                  <Plus /> Add item
                </button>
              </div>
              <div className="cms-item-list">
                {form.items.map((item, index) => (
                  <section key={item.id} className="cms-item">
                    <button
                      type="button"
                      className="cms-delete"
                      onClick={() =>
                        update(
                          "items",
                          form.items.filter((_, i) => i !== index),
                        )
                      }
                    >
                      <Trash2 />
                    </button>
                    <label>
                      Title / name
                      <input
                        value={item.title}
                        onChange={(e) =>
                          updateItem(index, "title", e.target.value)
                        }
                      />
                    </label>
                    <label>
                      Role / caption
                      <input
                        value={item.meta}
                        onChange={(e) =>
                          updateItem(index, "meta", e.target.value)
                        }
                      />
                    </label>
                    <label className="full">
                      Description / quote
                      <textarea
                        rows="3"
                        value={item.description}
                        onChange={(e) =>
                          updateItem(index, "description", e.target.value)
                        }
                      />
                    </label>
                    <label className="full">
                      Image URL
                      <input
                        value={item.imageUrl}
                        onChange={(e) =>
                          updateItem(index, "imageUrl", e.target.value)
                        }
                      />
                    </label>
                    <label className="cms-upload">
                      <ImagePlus /> Upload item image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => upload(e.target.files[0], index)}
                      />
                    </label>
                  </section>
                ))}
              </div>
              <button
                className="crm-primary cms-save"
                type="submit"
                disabled={saving}
              >
                <Save /> {saving ? "Saving…" : "Save & publish"}
              </button>
            </>
          )}
        </form>
      </div>
    </WebsiteSettingsLayout>
  );
}

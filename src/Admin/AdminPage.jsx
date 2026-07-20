import { useEffect, useMemo, useState } from "react";
import { useAuthActions, useConvexAuth } from "@convex-dev/auth/react";
import { useMutation, useQuery } from "convex/react";
import Navbar from "../Navbar/Navbar";
import { api } from "../../convex/_generated/api";
import { isConvexConfigured } from "../convexConfig";
import AppConvexProvider from "../ConvexProvider";
import "./AdminPage.css";

const emptyProject = {
  title: "",
  team: "",
  description: "",
  imageUrl: "/kiwihacksimage.jpg",
  event: "KiwiHacks '26",
  place: "Finalist",
  points: 0,
  repoUrl: "https://github.com/KiwiHacksNZ",
  demoUrl: "https://kiwihacks.org",
  featured: false,
  sortOrder: 100,
};

function normalizeProject(project) {
  return {
    title: project.title.trim(),
    team: project.team.trim(),
    description: project.description.trim(),
    imageUrl: project.imageUrl.trim(),
    event: project.event.trim(),
    place: project.place.trim(),
    points: Number(project.points),
    repoUrl: project.repoUrl.trim(),
    demoUrl: project.demoUrl.trim(),
    featured: Boolean(project.featured),
    sortOrder: Number(project.sortOrder),
  };
}

function AdminPageContent() {
  const convexReady = isConvexConfigured();
  const { signIn, signOut } = useAuthActions();
  const { isLoading, isAuthenticated } = useConvexAuth();
  const currentUser = useQuery(
    api.projects.currentUser,
    convexReady ? {} : "skip",
  );
  const projects = useQuery(api.projects.list, convexReady ? {} : "skip");
  const createProject = useMutation(api.projects.create);
  const updateProject = useMutation(api.projects.update);
  const removeProject = useMutation(api.projects.remove);

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyProject);
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const sortedProjects = useMemo(() => projects ?? [], [projects]);

  useEffect(() => {
    if (!editingId) return;
    const project = sortedProjects.find((item) => item._id === editingId);
    if (project) {
      setForm({
        title: project.title,
        team: project.team,
        description: project.description,
        imageUrl: project.imageUrl,
        event: project.event,
        place: project.place,
        points: project.points,
        repoUrl: project.repoUrl,
        demoUrl: project.demoUrl,
        featured: project.featured,
        sortOrder: project.sortOrder,
      });
    }
  }, [editingId, sortedProjects]);

  const setField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyProject);
    setStatus("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setStatus("");

    try {
      const payload = normalizeProject(form);
      if (editingId) {
        await updateProject({ id: editingId, ...payload });
        setStatus("Project updated.");
      } else {
        await createProject(payload);
        setStatus("Project added.");
      }
      resetForm();
    } catch (error) {
      setStatus(error.message || "Could not save project.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (projectId) => {
    setStatus("");
    try {
      await removeProject({ id: projectId });
      if (editingId === projectId) resetForm();
      setStatus("Project removed.");
    } catch (error) {
      setStatus(error.message || "Could not remove project.");
    }
  };

  return (
    <>
      <Navbar />

      <main className="admin-main">
        <section className="admin-shell">
          <div className="admin-header">
            <div>
              <p className="admin-kicker mono">Showcase Admin</p>
              <h1 className="display">Projects</h1>
            </div>
            <a className="admin-view-link" href="/showcase">
              View showcase
            </a>
          </div>

          {!convexReady ? (
            <div className="admin-panel">
              <h2>Convex env missing</h2>
              <p>
                Add `VITE_CONVEX_URL` to `.env.local`, then restart Vite.
              </p>
            </div>
          ) : (
            <>
              <div className="admin-auth-panel">
                <div>
                  <strong>
                    {isLoading
                      ? "Checking login..."
                      : isAuthenticated
                        ? currentUser?.username
                          ? `@${currentUser.username}`
                          : currentUser?.name || "Signed in"
                        : "Not signed in"}
                  </strong>
                  {currentUser?.unrestrictedDevMode ? (
                    <p>
                      Dev mode: any signed-in GitHub user can edit. Set
                      `ADMIN_GITHUB_USERNAMES` in Convex env to lock this down.
                    </p>
                  ) : null}
                  {currentUser?.isAdmin === false && isAuthenticated ? (
                    <p>This GitHub account is not in `ADMIN_GITHUB_USERNAMES`.</p>
                  ) : null}
                </div>
                {isAuthenticated ? (
                  <button type="button" onClick={() => signOut()}>
                    Sign out
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => signIn("github", { redirectTo: "/admin" })}
                  >
                    Sign in with GitHub
                  </button>
                )}
              </div>

              {!isAuthenticated ? (
                <div className="admin-panel">
                  <h2>Login required</h2>
                  <p>Sign in with an approved GitHub account to manage projects.</p>
                </div>
              ) : currentUser === undefined ? (
                <div className="admin-panel">
                  <h2>Loading access</h2>
                  <p>Checking your GitHub account.</p>
                </div>
              ) : currentUser?.isAdmin === false ? (
                <div className="admin-panel">
                  <h2>Access denied</h2>
                  <p>This GitHub username is not allowed to manage showcase projects.</p>
                </div>
              ) : (
                <>
                  <form className="admin-form" onSubmit={handleSubmit}>
                    <div className="admin-form-title">
                      <h2>{editingId ? "Edit project" : "Add project"}</h2>
                      {editingId ? (
                        <button type="button" onClick={resetForm}>
                          New project
                        </button>
                      ) : null}
                    </div>

                    <label>
                      Title
                      <input
                        value={form.title}
                        onChange={(event) =>
                          setField("title", event.target.value)
                        }
                        required
                      />
                    </label>
                    <label>
                      Team
                      <input
                        value={form.team}
                        onChange={(event) => setField("team", event.target.value)}
                        required
                      />
                    </label>
                    <label className="admin-wide">
                      Description
                      <textarea
                        value={form.description}
                        onChange={(event) =>
                          setField("description", event.target.value)
                        }
                        rows="4"
                        required
                      />
                    </label>
                    <label className="admin-wide">
                      Image URL
                      <input
                        value={form.imageUrl}
                        onChange={(event) =>
                          setField("imageUrl", event.target.value)
                        }
                        required
                      />
                    </label>
                    <label>
                      Event
                      <input
                        value={form.event}
                        onChange={(event) =>
                          setField("event", event.target.value)
                        }
                        required
                      />
                    </label>
                    <label>
                      Place
                      <input
                        value={form.place}
                        onChange={(event) =>
                          setField("place", event.target.value)
                        }
                        required
                      />
                    </label>
                    <label>
                      Points
                      <input
                        type="number"
                        value={form.points}
                        onChange={(event) =>
                          setField("points", event.target.value)
                        }
                        required
                      />
                    </label>
                    <label>
                      Sort order
                      <input
                        type="number"
                        value={form.sortOrder}
                        onChange={(event) =>
                          setField("sortOrder", event.target.value)
                        }
                        required
                      />
                    </label>
                    <label className="admin-wide">
                      Repo URL
                      <input
                        type="url"
                        value={form.repoUrl}
                        onChange={(event) =>
                          setField("repoUrl", event.target.value)
                        }
                        required
                      />
                    </label>
                    <label className="admin-wide">
                      Demo URL
                      <input
                        type="url"
                        value={form.demoUrl}
                        onChange={(event) =>
                          setField("demoUrl", event.target.value)
                        }
                        required
                      />
                    </label>
                    <label className="admin-checkbox">
                      <input
                        type="checkbox"
                        checked={form.featured}
                        onChange={(event) =>
                          setField("featured", event.target.checked)
                        }
                      />
                      Featured hero card
                    </label>

                    <div className="admin-actions admin-wide">
                      <button type="submit" disabled={isSaving}>
                        {isSaving ? "Saving..." : editingId ? "Update" : "Add"}
                      </button>
                      {status ? <p>{status}</p> : null}
                    </div>
                  </form>

                  <div className="admin-project-list">
                    {sortedProjects.length === 0 ? (
                      <p>No projects in Convex yet.</p>
                    ) : (
                      sortedProjects.map((project) => (
                        <article key={project._id}>
                          <img src={project.imageUrl} alt="" />
                          <div>
                            <h3>{project.title}</h3>
                            <p>{project.team}</p>
                            <p>
                              {project.place} - {project.event} -{" "}
                              {project.points} points
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setEditingId(project._id)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(project._id)}
                          >
                            Remove
                          </button>
                        </article>
                      ))
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </section>
      </main>
    </>
  );
}

export default function AdminPage() {
  return (
    <AppConvexProvider>
      <AdminPageContent />
    </AppConvexProvider>
  );
}

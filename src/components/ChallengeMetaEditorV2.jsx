import { SectionTitle, Label, TextInput, TextArea, HexColorInput } from "./ui.jsx";

export default function ChallengeMetaEditorV2({ meta, onChange }) {
  const setField = (field, value) => onChange({ ...meta, [field]: value });

  const setNested = (path, value) => {
    const next = JSON.parse(JSON.stringify(meta));
    let cur = next;
    for (let i = 0; i < path.length - 1; i++) {
      if (cur[path[i]] == null) cur[path[i]] = {};
      cur = cur[path[i]];
    }
    cur[path[path.length - 1]] = value;
    onChange(next);
  };

  return (
    <div className="h-full overflow-y-auto space-y-6 pr-2">
      <div>
        <SectionTitle>Challenge Info</SectionTitle>
        <div className="space-y-3">
          <div>
            <Label>ID</Label>
            <TextInput
              value={meta.id || ""}
              onChange={(v) => setField("id", v)}
              placeholder="ChallengeDecember2025"
            />
          </div>
          <div>
            <Label>Title</Label>
            <TextInput
              value={meta.title || ""}
              onChange={(v) => setField("title", v)}
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <TextInput
              value={meta.subtitle || ""}
              onChange={(v) => setField("subtitle", v)}
            />
          </div>
          <div>
            <Label>Description</Label>
            <TextArea
              rows={4}
              value={meta.description || ""}
              onChange={(v) => setField("description", v)}
            />
          </div>
          <div>
            <Label>Deeplink</Label>
            <TextInput
              value={meta.deeplink || ""}
              onChange={(v) => setField("deeplink", v)}
            />
          </div>
        </div>
      </div>

      <div>
        <SectionTitle>Theme</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Background (light)</Label>
            <HexColorInput
              value={meta.theme?.background?.light}
              onChange={(v) => setNested(["theme", "background", "light"], v)}
            />
          </div>
          <div>
            <Label>Background (dark)</Label>
            <HexColorInput
              value={meta.theme?.background?.dark}
              onChange={(v) => setNested(["theme", "background", "dark"], v)}
            />
          </div>
          <div>
            <Label>Text (light)</Label>
            <HexColorInput
              value={meta.theme?.text?.light}
              onChange={(v) => setNested(["theme", "text", "light"], v)}
            />
          </div>
          <div>
            <Label>Text (dark)</Label>
            <HexColorInput
              value={meta.theme?.text?.dark}
              onChange={(v) => setNested(["theme", "text", "dark"], v)}
            />
          </div>
        </div>
        <div
          className="mt-3 rounded-xl p-3 text-sm border border-[#E6F4F9]"
          style={{
            backgroundColor: meta.theme?.background?.light || "#ffffff",
            color: meta.theme?.text?.light || "#000000"
          }}
        >
          Light preview — {meta.title || "Title"}
        </div>
        <div
          className="mt-2 rounded-xl p-3 text-sm border border-[#E6F4F9]"
          style={{
            backgroundColor: meta.theme?.background?.dark || "#000000",
            color: meta.theme?.text?.dark || "#ffffff"
          }}
        >
          Dark preview — {meta.title || "Title"}
        </div>
      </div>

      <div>
        <SectionTitle>Visibility</SectionTitle>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label>Start Date</Label>
            <TextInput
              type="date"
              value={meta.visibility?.startDate || ""}
              onChange={(v) => setNested(["visibility", "startDate"], v)}
            />
          </div>
          <div>
            <Label>End Date</Label>
            <TextInput
              type="date"
              value={meta.visibility?.endDate || ""}
              onChange={(v) => setNested(["visibility", "endDate"], v)}
            />
          </div>
          <div>
            <Label>Visible From</Label>
            <TextInput
              type="date"
              value={meta.visibility?.visibleFrom || ""}
              onChange={(v) => setNested(["visibility", "visibleFrom"], v)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

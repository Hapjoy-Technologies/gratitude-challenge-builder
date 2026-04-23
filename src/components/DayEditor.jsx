import {
  SectionTitle,
  Label,
  TextInput,
  TextArea,
  Toggle,
  PillButton,
  ColorPicker
} from "./ui.jsx";

export default function DayEditor({ day, index, onChange }) {
  if (!day) {
    return (
      <div className="h-full flex items-center justify-center text-sm text-slate-400">
        Select or create a day to start editing.
      </div>
    );
  }

  const updateField = (field, value) => {
    onChange({ ...day, [field]: value });
  };

  const updateExample = (i, value) => {
    const examples = [...day.examples];
    examples[i] = value;
    onChange({ ...day, examples });
  };

  const addExample = () => {
    onChange({
      ...day,
      examples: [
        ...day.examples,
        "Write another example entry for this day's prompt here."
      ]
    });
  };

  const removeExample = (i) => {
    onChange({ ...day, examples: day.examples.filter((_, idx) => idx !== i) });
  };

  const updatePointer = (i, value) => {
    const pointers = [...day.pointers];
    pointers[i] = value;
    onChange({ ...day, pointers });
  };

  const addPointer = () => {
    onChange({
      ...day,
      pointers: [...day.pointers, "Helpful hint or reflection pointer."]
    });
  };

  const removePointer = (i) => {
    onChange({ ...day, pointers: day.pointers.filter((_, idx) => idx !== i) });
  };

  return (
    <div className="h-full overflow-y-auto space-y-5 pr-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">Editing</p>
          <h1 className="text-lg font-semibold text-slate-800">
            {day.title}{" "}
            <span className="text-xs font-normal text-slate-400">({day.dayId})</span>
          </h1>
        </div>
        <span className="text-xs text-slate-400">Day index: {index + 1}</span>
      </div>

      <div>
        <SectionTitle>Basic Info</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="dayTitle">Title</Label>
            <TextInput
              id="dayTitle"
              value={day.title}
              onChange={(v) => updateField("title", v)}
            />
          </div>
          <div>
            <Label htmlFor="daySubTitle">Subtitle</Label>
            <TextInput
              id="daySubTitle"
              value={day.subTitle}
              onChange={(v) => updateField("subTitle", v)}
            />
          </div>
          <div>
            <Label htmlFor="primaryColor">Primary Color</Label>
            <ColorPicker
              value={day.primaryColor}
              onChange={(color) => updateField("primaryColor", color)}
            />
          </div>
          <div>
            <Label htmlFor="daySinceJoining">Day Since Joining</Label>
            <TextInput
              id="daySinceJoining"
              type="number"
              value={day.daySinceJoining}
              onChange={(v) => updateField("daySinceJoining", Number(v || 0))}
            />
          </div>
        </div>
      </div>

      <div>
        <SectionTitle>Caption</SectionTitle>
        <TextArea
          id="captionText"
          rows={5}
          value={day.captionText}
          onChange={(v) => updateField("captionText", v)}
        />
      </div>

      <div>
        <SectionTitle>Prompt</SectionTitle>
        <div className="space-y-2">
          <div>
            <Label htmlFor="promptHeader">Prompt Header</Label>
            <TextInput
              id="promptHeader"
              value={day.promptHeader}
              onChange={(v) => updateField("promptHeader", v)}
            />
          </div>
          <div>
            <Label htmlFor="promptHeaderText">Prompt Text</Label>
            <TextArea
              id="promptHeaderText"
              rows={3}
              value={day.promptHeaderText}
              onChange={(v) => updateField("promptHeaderText", v)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Toggle
              label="Show Invite"
              checked={day.showInvite}
              onChange={(v) => updateField("showInvite", v)}
            />
            <Toggle
              label="Show Survey"
              checked={day.showSurvey}
              onChange={(v) => updateField("showSurvey", v)}
            />
          </div>
        </div>
      </div>

      <div>
        <SectionTitle>Examples</SectionTitle>
        <p className="text-[11px] text-slate-500 mb-2">
          These sample responses guide the tone and depth for this day.
        </p>
        <div className="space-y-3">
          {day.examples.map((ex, i) => (
            <div
              key={i}
              className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-medium text-slate-500">
                  Example {i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeExample(i)}
                  className="text-[11px] text-slate-400 hover:text-red-500"
                >
                  Remove
                </button>
              </div>
              <TextArea
                rows={3}
                value={ex}
                onChange={(v) => updateExample(i, v)}
              />
            </div>
          ))}
          <PillButton variant="ghost" onClick={addExample}>
            + Add example
          </PillButton>
        </div>
      </div>

      <div>
        <SectionTitle>Pointers (Optional)</SectionTitle>
        <p className="text-[11px] text-slate-500 mb-2">
          Short hints or reminders users can see before writing.
        </p>
        <div className="space-y-2">
          {day.pointers.map((p, i) => (
            <div key={i} className="flex items-start space-x-2">
              <span className="mt-1 text-xs text-slate-400">{i + 1}.</span>
              <div className="flex-1">
                <TextInput value={p} onChange={(v) => updatePointer(i, v)} />
              </div>
              <button
                type="button"
                onClick={() => removePointer(i)}
                className="mt-1 text-xs text-slate-400 hover:text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
          <PillButton variant="ghost" onClick={addPointer}>
            + Add pointer
          </PillButton>
        </div>
      </div>
    </div>
  );
}

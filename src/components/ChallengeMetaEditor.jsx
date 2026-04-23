import {
  SectionTitle,
  Label,
  TextInput,
  TextArea,
  Toggle,
  PillButton
} from "./ui.jsx";

export default function ChallengeMetaEditor({ meta, onChange, onGenerateDays }) {
  const handleChangeField = (field, value) => {
    onChange({ ...meta, [field]: value });
  };

  const handleInstructionChange = (index, value) => {
    const instructions = [...meta.instructions];
    instructions[index] = value;
    onChange({ ...meta, instructions });
  };

  const addInstruction = () => {
    onChange({ ...meta, instructions: [...meta.instructions, ""] });
  };

  const removeInstruction = (index) => {
    onChange({
      ...meta,
      instructions: meta.instructions.filter((_, i) => i !== index)
    });
  };

  const handleCarouselChange = (index, field, value) => {
    const cards = [...meta.carouselCards];
    cards[index] = { ...cards[index], [field]: value };
    onChange({ ...meta, carouselCards: cards });
  };

  const addCarouselCard = () => {
    onChange({
      ...meta,
      carouselCards: [
        ...meta.carouselCards,
        {
          title: "New Card",
          subtitle: "Short description",
          bgColor: "#E1FAFF",
          illusUrl:
            "https://gratitude-app-content.s3.amazonaws.com/challenges/carousels/carousel_smile.png"
        }
      ]
    });
  };

  const removeCarouselCard = (index) => {
    onChange({
      ...meta,
      carouselCards: meta.carouselCards.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="h-full overflow-y-auto space-y-6 pr-2">
      <div>
        <SectionTitle>Challenge Info</SectionTitle>
        <div className="space-y-3">
          <div>
            <Label htmlFor="challengeId">Challenge ID</Label>
            <TextInput
              id="challengeId"
              value={meta.challengeId}
              onChange={(v) => handleChangeField("challengeId", v)}
              placeholder="ChallengeDecember2025"
            />
          </div>
          <div>
            <Label htmlFor="title">Title</Label>
            <TextInput
              id="title"
              value={meta.title}
              onChange={(v) => handleChangeField("title", v)}
              placeholder="December Reflection Challenge"
            />
          </div>
          <div>
            <Label htmlFor="subtitle">Subtitle</Label>
            <TextInput
              id="subtitle"
              value={meta.subtitle}
              onChange={(v) => handleChangeField("subtitle", v)}
              placeholder="30 days of reflection and gentle release."
            />
          </div>
          <div>
            <Label htmlFor="entityDescriptor">Entity Descriptor</Label>
            <TextInput
              id="entityDescriptor"
              value={meta.entityDescriptor}
              onChange={(v) => handleChangeField("entityDescriptor", v)}
              placeholder="December Challenge 2025"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <TextArea
              id="description"
              rows={3}
              value={meta.description}
              onChange={(v) => handleChangeField("description", v)}
            />
          </div>
        </div>
      </div>

      <div>
        <SectionTitle>Dates & Duration</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="duration">Duration (days)</Label>
            <TextInput
              id="duration"
              type="number"
              value={meta.duration}
              onChange={(v) => handleChangeField("duration", Number(v || 0))}
            />
          </div>
          <div>
            <Label htmlFor="order">Order</Label>
            <TextInput
              id="order"
              type="number"
              value={meta.order}
              onChange={(v) => handleChangeField("order", Number(v || 0))}
            />
          </div>
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <TextInput
              id="startDate"
              type="date"
              value={meta.startDate}
              onChange={(v) => handleChangeField("startDate", v)}
            />
          </div>
          <div>
            <Label htmlFor="showDate">Show Date</Label>
            <TextInput
              id="showDate"
              type="date"
              value={meta.showDate}
              onChange={(v) => handleChangeField("showDate", v)}
            />
          </div>
          <div>
            <Label htmlFor="hideDate">Hide Date</Label>
            <TextInput
              id="hideDate"
              type="date"
              value={meta.hideDate}
              onChange={(v) => handleChangeField("hideDate", v)}
            />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Toggle
              label="Show as newly launched"
              checked={meta.showAsNewlyLaunched}
              onChange={(v) => handleChangeField("showAsNewlyLaunched", v)}
            />
          </div>
          <PillButton
            onClick={() => onGenerateDays(meta.challengeId, meta.duration)}
          >
            Generate {meta.duration} days
          </PillButton>
        </div>
      </div>

      <div>
        <SectionTitle>Share & Links</SectionTitle>
        <div className="space-y-3">
          <div>
            <Label htmlFor="shareMessage">Share Message</Label>
            <TextArea
              id="shareMessage"
              rows={3}
              value={meta.shareMessage}
              onChange={(v) => handleChangeField("shareMessage", v)}
            />
          </div>
          <div>
            <Label htmlFor="surveyUrl">Survey URL</Label>
            <TextInput
              id="surveyUrl"
              value={meta.surveyUrl}
              onChange={(v) => handleChangeField("surveyUrl", v)}
              placeholder="https://..."
            />
          </div>
          <div>
            <Label htmlFor="thumbnailIllusUrl">Thumbnail Illustration URL</Label>
            <TextInput
              id="thumbnailIllusUrl"
              value={meta.thumbnailIllusUrl}
              onChange={(v) => handleChangeField("thumbnailIllusUrl", v)}
            />
          </div>
          <div>
            <Label htmlFor="bannerIllusUrl">Banner Illustration URL</Label>
            <TextInput
              id="bannerIllusUrl"
              value={meta.bannerIllusUrl}
              onChange={(v) => handleChangeField("bannerIllusUrl", v)}
            />
          </div>
          <div>
            <Label htmlFor="cardIllusUrl">Card Illustration URL</Label>
            <TextInput
              id="cardIllusUrl"
              value={meta.cardIllusUrl}
              onChange={(v) => handleChangeField("cardIllusUrl", v)}
            />
          </div>
        </div>
      </div>

      <div>
        <SectionTitle>Instructions</SectionTitle>
        <div className="space-y-2">
          {meta.instructions.map((inst, idx) => (
            <div key={idx} className="flex items-start space-x-2">
              <span className="mt-1 text-xs text-[#A8A3B0]">{idx + 1}.</span>
              <div className="flex-1">
                <TextInput
                  value={inst}
                  onChange={(v) => handleInstructionChange(idx, v)}
                />
              </div>
              <button
                type="button"
                onClick={() => removeInstruction(idx)}
                className="mt-1 text-xs text-[#A8A3B0] hover:text-[#FF05B9]"
              >
                ✕
              </button>
            </div>
          ))}
          <PillButton variant="ghost" onClick={addInstruction}>
            + Add instruction
          </PillButton>
        </div>
      </div>

      <div>
        <SectionTitle>Carousel Cards</SectionTitle>
        <div className="space-y-3">
          {meta.carouselCards.map((card, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-[#E6F4F9] bg-white p-3 shadow-[0_2px_8px_rgba(43,0,98,0.04)]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#868484]">
                  Card {idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeCarouselCard(idx)}
                  className="text-xs text-[#A8A3B0] hover:text-[#FF05B9]"
                >
                  Remove
                </button>
              </div>
              <div className="space-y-2">
                <div>
                  <Label>Title</Label>
                  <TextInput
                    value={card.title}
                    onChange={(v) => handleCarouselChange(idx, "title", v)}
                  />
                </div>
                <div>
                  <Label>Subtitle</Label>
                  <TextArea
                    rows={2}
                    value={card.subtitle}
                    onChange={(v) => handleCarouselChange(idx, "subtitle", v)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>Background Color</Label>
                    <TextInput
                      value={card.bgColor}
                      onChange={(v) =>
                        handleCarouselChange(idx, "bgColor", v)
                      }
                    />
                  </div>
                  <div>
                    <Label>Illustration URL</Label>
                    <TextInput
                      value={card.illusUrl}
                      onChange={(v) =>
                        handleCarouselChange(idx, "illusUrl", v)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <PillButton variant="ghost" onClick={addCarouselCard}>
            + Add carousel card
          </PillButton>
        </div>
      </div>
    </div>
  );
}

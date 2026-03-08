# Gempper Mode

A Gemini CLI skill that optimizes Gemini for one-handed remote control. Every response becomes 3 numbered choices navigable with the Flipper Zero's 5 buttons.

## Install

```bash
npx gempper
```

This installs the Gemini CLI skill, Flipper `.fap` files, and macro presets.

## Usage

The Gempper skill auto-activates when Gemini CLI detects remote control use. Gemini will present every decision as 3 numbered options:

```
**[1]** What you most likely want — do it
**[2]** Show details / slower path
**[3]** Change direction / more options

Reply 1, 2, or 3:
```

Type custom text anytime instead of picking a number.

## How It Works

The skill tells Gemini you're controlling it with a 5-button remote (1, 2, 3, Enter, voice dictation). Gemini will:

- **Predict** what you want based on codebase context and conversation history
- **Batch** small decisions instead of asking one at a time
- **Auto-continue** when the next step is obvious
- **Paginate** with option 3 when there are more than 3 real choices
- **Never stop without choices** — every response ends with numbered options

## Alternative: Manual Install

Copy the skill folder manually:
```bash
mkdir -p ~/.gemini/skills
cp -r skill/gempper ~/.gemini/skills/
```

Or place the contents of `skill/gempper/SKILL.md` (below the YAML frontmatter) into your `~/.gemini/GEMINI.md` for always-on mode.

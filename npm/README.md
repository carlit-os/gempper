# Gempper

A Flipper Zero remote control for [Gemini CLI](https://github.com/google-gemini/gemini-cli). One-handed coding with 5 buttons: approve (1/2/3), enter, and voice dictation.

## Install

```bash
npx gempper
```

This installs:
- **Gemini CLI skill** — makes Gemini present every decision as 3 numbered choices (installed to `~/.gemini/skills/gempper/`)
- **Flipper Zero apps** — BLE and USB `.fap` files ready to copy to your Flipper
- **Macro presets** — pre-built command sets (default, debugging, workflow, etc.)

## Usage

1. Open Gemini CLI
2. Gemini CLI auto-activates the skill (no manual command needed)
3. Pick up your Flipper and start coding

Every Gemini response becomes:
```
1. [What you most likely want]
2. [Show details first]
3. [Change direction]
```

## Flipper Setup

After running `npx gempper`, copy the right `.fap` to your Flipper's SD card:

| Firmware | File | SD Path |
|----------|------|---------|
| Momentum / Unleashed | `~/gempper/gemini_remote_ble.fap` | `apps/Bluetooth/` |
| Stock | `~/gempper/gemini_remote_usb.fap` | `apps/Tools/` |

### Macros (optional)

Copy a macro preset to your Flipper:
```
~/gempper/macros/default.txt -> SD/apps_data/gemini_remote_ble/macros.txt
```

Available presets: `default`, `minimal`, `barebones`, `debugging`, `workflow`, `review`, `maximalist`

## Uninstall

```bash
npx gempper --uninstall
```

## Links

- [GitHub](https://github.com/carlit-os/gempper)
- [Claupper](https://github.com/Wet-wr-Labs/claupper) — the original

Adapted from [Claupper](https://github.com/Wet-wr-Labs/claupper) by [Kasen Sansonetti](https://github.com/w3t-wr3) & [Wetware Labs](https://WetwareOfficial.com).

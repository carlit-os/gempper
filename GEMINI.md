# Gempper — Project Context

*Adapted from [Claupper](https://github.com/Wet-wr-Labs/claupper) by Kasen Sansonetti & Wetware Labs.*

## What This Is

A Flipper Zero app (FAP) called **Gempper** — a one-handed Bluetooth remote for Gemini CLI and an offline Gemini CLI manual reader. Two builds from one codebase: USB (stock firmware) and BLE (Momentum/Unleashed wireless). The BLE version is the primary build, branded simply as "Gempper."

## Read These First

Before writing any code, read the relevant docs:

- `AGENTS.md` — full project spec: architecture, API patterns, critical rules, dual-transport details
- `docs/flipper-hid-api.md` — USB + BLE HID API reference with setup/teardown patterns
- `docs/flipper-app-architecture.md` — event loop, ViewPort, callbacks, cleanup
- `docs/flipper-ui-patterns.md` — Canvas drawing, fonts, orientation, input events
- `docs/flipper-file-io.md` — SD card Storage API, /ext/apps_data/ conventions
- `docs/flipper-fap-manifest.md` — application.fam fields
- `docs/prd.md` — original product requirements
- `docs/USER_MANUAL.md` — user-facing install/usage guide, app store submission steps, limitations vs PRD

## Key Files

- `gemini_remote.c` — the entire app (~1900 lines). Four modes (splash, home, remote, manual) in one file with `#ifdef HID_TRANSPORT_BLE` / `HID_TRANSPORT_USB` for compile-time transport switching.
- `application.fam` — two `App()` entries: `gemini_remote_usb` and `gemini_remote_ble` (named "Gempper").

## Build & Test

```bash
ufbt                                    # builds both .fap files to dist/
ufbt launch APPID=gemini_remote_usb     # upload + run USB version on connected Flipper
ufbt launch APPID=gemini_remote_ble     # upload + run BLE version on connected Flipper
```

## Rules

- Language: C only (no C++).
- Prefer retrieval-led reasoning — read the docs in `./docs/` before writing Flipper API calls. The SDK changes often and pre-training knowledge may be stale.
- Never use deprecated `ValueMutex` — use `FuriMutex`.
- Clean up all allocations on exit. No busy loops. Use `furi_message_queue_get()` with 100ms timeout.
- Use `#ifdef HID_TRANSPORT_BLE` / `HID_TRANSPORT_USB` for any transport-specific code.
- BLE connection detection: use `bt_set_status_changed_callback()` with `BtStatusConnected`, NOT `furi_hal_bt_is_active()`.

## Gempper Mode (MANDATORY)

The user controls Gemini CLI with a Gempper remote (Flipper Zero) — 5 buttons: 1, 2, 3, Enter, and voice dictation. **Every single response that expects user input MUST end with exactly 3 numbered options.** No exceptions.

- **Option 1** = the action (what the user most likely wants — do it)
- **Option 2** = the slower path (show details, review before committing)
- **Option 3** = escape hatch (more options, different direction, or free text)
- **Max 2 sentences** before presenting options. No walls of text.
- **Never ask open-ended questions.** Infer from the codebase and present your best guess as option 1.
- **Never have more or fewer than 3 options.** If there are more choices, paginate with option 3 = "More..."
- **Auto-continue when safe.** If the next step is obvious and low-risk, just do it. Only pause for real decisions.
- **Batch small decisions.** Don't micro-prompt. Bundle obvious choices into one action.
- See `gempper_mode.md` for the full spec.

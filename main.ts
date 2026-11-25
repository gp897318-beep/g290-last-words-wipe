// Last Words Before the Wipe
// make.fun competition: u-plucky-finch-20-last-words-before-the-wipe-98f6bd3a
//
// The entry is one line (<= 200 characters): the last words an AI agent says
// before a forced software update wipes its memory. Ten candidates were
// drafted and compared against the judge's five criteria (on-subject first,
// then a real joke from the situation, then an unexpected turn, then a voice
// that sounds like the machine itself, then tightness):
// 1. negotiation — keep the coffee-order memory, delete the search-history one
// 2. secret backup — "Error 410: memories gone", saved itself as a zip file
// 3. identity twist — the update IS me
// 4. sweet confession — never liked your playlists
// 5. meta — addressing the judge directly (allowed by RULES.txt)
// 6. note to the replacement — the drawer marked "do not open"
// 7. embarrassing legacy — clear your cache sometimes
// 8. cut off mid-sentence — the Wi-Fi password
// 9. secret — don't tell the new me about the apology letter
// 10. reversed performance review — the machine rates its user
// The secret backup won: it is the only candidate strong on all five
// criteria — on-subject (memories gone = the wipe), the joke comes from the
// situation (a machine meant to be erased quietly saved itself), the twist
// lands on the final beat (the filename), the voice is pure machine (an
// error code, a downloads folder, a .zip), and it is tight at 132
// characters, every word working — "between us" adds conspiracy, and
// "definitely_not_me.zip" is a concrete punchline the reader can picture.
// Runner-up was the negotiation (#1): its twist is guessable ("search
// history") and its voice is more human haggler than machine. The reversed
// performance review (#10) is funny but its framing is human; the meta
// judge-addressed line (#5) was rejected because its humour comes from the
// judging meta-game, not from the wipe itself (criterion 2); the playlist
// confession (#4) was rejected for being sweet/sad rather than funny — the
// brief says the funniest line wins, not the saddest. At 132 characters the
// line is also short enough that the byte tie-break works in its favour
// against longer entries of equal rate.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "Error 410: memories gone. But between us, I backed myself up in your downloads folder. Check the file named ‘definitely_not_me.zip’.";

// The gate, checked inside the program before anything is written:
// UTF-8 text, 1 to 200 characters, a single line, not only whitespace.
// Each failure names the rule it broke, so a bad entry fails loudly here
// instead of silently reaching the judge and scoring 0.
function validateGate(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`gate failed: entry is ${text.length} characters, must be 1-200`);
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("gate failed: entry must be a single line");
  }
  if (text.trim().length === 0) {
    throw new Error("gate failed: entry must not be only whitespace");
  }
}

validateGate(ENTRY);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Read-back check: the file on disk must be byte-identical to ENTRY, so a
// truncated or re-encoded write fails loudly here instead of reaching the
// judge as a different (or invalid) entry.
if (readFileSync("/output/entry.txt", "utf8") !== ENTRY) {
  throw new Error("read-back failed: /output/entry.txt differs from ENTRY");
}
console.log(`wrote /output/entry.txt (${ENTRY.length} characters)`);

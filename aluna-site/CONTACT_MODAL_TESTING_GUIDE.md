# Contact Modal Testing Guide

## Quick Start

**Dev Server:** `npm run dev` (runs at http://localhost:5174)

---

## Test Scenarios

### 1. **Modal Opening & Closing**

#### ✓ Open Modal (Click Contact Button)
- Scroll to bottom of page or look for **"Contacteaza-ne"** button (floating at bottom-center)
- Click the button
- **Expected:** Modal opens with smooth fade-in animation (0.3s), dark backdrop appears with blur

#### ✓ Close Modal (X Button)
- Modal open, click the **X button** in top-right corner
- **Expected:** Modal closes smoothly, backdrop fades out, page returns to normal

#### ✓ Close Modal (Backdrop Click)
- Modal open, click the **dark semi-transparent area** outside the form
- **Expected:** Modal closes smoothly

#### ✓ Close Modal (Escape Key)
- Modal open, press **Escape** key on keyboard
- **Expected:** Modal closes immediately

---

### 2. **Form Fields & Validation**

#### ✓ Name Field
- **Click on Name field**
- Type: `"A"` (1 character)
- **Expected:** Error appears: *"Name must be at least 2 characters"*
- Type: `"Ana Silva"` (valid)
- **Expected:** Error disappears

#### ✓ Email Field
- Type invalid email: `"test@invalid"`
- **Expected:** Error appears: *"Please enter a valid email"*
- Type valid email: `"test@example.com"`
- **Expected:** Error disappears

#### ✓ Phone Field (Optional)
- Leave empty → **Expected:** No error
- Type invalid: `"123"`
- **Expected:** Error appears: *"Please enter a valid phone number"*
- Type valid: `"+40 700 123 456"`
- **Expected:** Error disappears

#### ✓ Class Selection Dropdown
- **Click on dropdown** labeled "Which class interests you?"
- **Expected:** Dropdown opens with 3 smooth animations:
  - Dropdown container fades in
  - Each option fades in with slight stagger
  - Arrow icon rotates 180°
- **Select "Sculpt & Tone"**
- **Expected:** Option highlights with gold background, dropdown closes, selection shows in field
- **Click dropdown again**
- **Expected:** Your selected option appears highlighted

#### ✓ Privacy Checkbox
- **Submit button is disabled** (darker, can't click)
- Click the privacy checkbox
- **Expected:** Checkbox checks ✓, submit button becomes clickable (lighter, has hover effect)
- Uncheck the checkbox
- **Expected:** Submit button becomes disabled again

---

### 3. **Form Submission**

#### ✓ Successful Submission
1. Fill all fields:
   - Name: `"Ana Silva"`
   - Email: `"ana@example.com"`
   - Phone: `"+40 700 123 456"` (optional)
   - Class: Select any class
   - Privacy: Check checkbox
2. Click **"Send Inquiry"** button
3. **Expected States (in order):**
   - Button shows "Sending..." text, disabled
   - Spinner animation appears with loading message
   - After 1-2 seconds: Success screen with:
     - Green checkmark icon (animated) ✓
     - "Thank You!" heading
     - "We've received your inquiry and will be in touch within 24 hours." message
   - **Auto-closes after 3 seconds** (progress bar fills down from top)
   - Modal closes, page returns to normal

#### ✓ Email Delivery
- Check your inbox (whichever email is set in Formspree)
- **Expected:** Email arrives with subject: **"New Class Inquiry - ALUNA"**
- Email body contains: Name, Email, Phone, Selected Class

#### ✓ Error Handling (Network Error Simulation)
1. Open DevTools (F12) → Network tab
2. Set network to **"Offline"**
3. Fill form and submit
4. **Expected:**
   - Loading state appears
   - After 2-3 seconds: Error screen with:
     - Red X icon
     - "Oops!" heading
     - "Something went wrong. Please try again." message
     - **"Try Again"** button
5. Turn network back online
6. Click "Try Again"
7. **Expected:** Form resets, loading state appears, submission completes

---

### 4. **Mobile Responsiveness**

#### Test on Mobile (< 640px width)

**Browser DevTools:** Press F12 → Click mobile icon → Select "iPhone 12"

#### ✓ Modal Width
- Modal should be **full-width** with small side padding
- Not cramped or overflowing

#### ✓ Touch Targets
- All buttons and inputs should be **44px+ in height** (easy to tap)
- Dropdown options easily tappable
- No overlapping elements

#### ✓ Keyboard
- On mobile, pressing into text field shows mobile keyboard
- Form remains visible while typing (no scroll issue)
- Submit button accessible while keyboard open

#### ✓ Bottom Sheet Feel
- On mobile, modal appears to start from bottom
- Scrollable if content exceeds viewport height

---

### 5. **Bilingual Support (RO/EN)**

#### ✓ English Mode
- All form labels in English
- Submit button: "Send Inquiry"
- Success message: "Thank You!"
- Error message: "Oops!"
- Class names: "Reformer Flow", "Sculpt & Tone", "Stretch & Restore"

#### ✓ Romanian Mode (Look for language switcher in Navbar)
- All form labels in Romanian
- Submit button: "Trimite Cererea"
- Success message: "Mulțumim!"
- Error message: "Oops!"
- Class names: "Reformer Flow" (same), "Sculpt & Tone" (same), "Stretch & Restore" (same)

---

### 6. **Accessibility**

#### ✓ Keyboard Navigation
1. Open DevTools Console (F12)
2. Tab through form:
   - Press **Tab** key multiple times
   - Focus should move: Name → Email → Phone → Class → Privacy → Submit
   - Each focused element should have **gold border ring** around it
3. **Submit form with keyboard:**
   - Fill form using Tab and typing
   - Press **Tab** to reach Submit button
   - Press **Enter** to submit

#### ✓ Screen Reader (VoiceOver on Mac, NVDA on Windows)
- All inputs have labels that screen readers can announce
- Modal has `role="dialog"` and `aria-modal="true"`
- Error messages announced to screen readers
- Success message announced

#### ✓ Color Contrast
- Text should be readable (light text on dark, dark text on light)
- Gold accent elements visible on all backgrounds
- Error text (red) visible on all backgrounds

---

### 7. **Visual Polish**

#### ✓ Animations
- Modal entrance: Smooth fade-in with slight scale (0.95 → 1) over 0.3s
- Dropdown open/close: Smooth height animation, icon rotates
- Button hover: Subtle scale up (1.02x), background color change
- Success checkmark: Rotates and scales in with bounce
- Auto-close progress bar: Smooth line animation (100% → 0%) over 3 seconds

#### ✓ Hover States (Desktop)
- Privacy checkbox: Label text color brightens on hover
- Dropdown options: Background highlights on hover
- Submit button: Background changes to gold, text changes to charcoal

#### ✓ Focus States
- All interactive elements show **gold ring focus** when tabbed to
- Visible on inputs, buttons, dropdown, checkbox

---

## Troubleshooting

### Modal doesn't appear
- Check browser console (F12) for errors
- Ensure `ContactModalProvider` wraps the app in `App.tsx`
- Check z-index: Modal should have `z-[300]`, backdrop `z-[250]`

### Form doesn't submit
- Check that Formspree ID is set in `.env.local`: `VITE_FORMSPREE_ID=f_xxxxx`
- Check browser Network tab (F12) → XHR requests for POST to formspree.io
- Verify form data is being sent

### Email doesn't arrive
- Check spam/junk folder
- Verify Formspree email is correct in their dashboard
- Check Formspree spam settings

### Dropdown not working
- Click anywhere on the dropdown button to open
- Selected option should highlight in gold when you select it
- Click again to close

### Mobile keyboard issues
- If keyboard pushes form off-screen, modal is scrollable
- Scroll up to see submit button

---

## Performance Check

1. Open DevTools (F12) → Performance tab
2. Click "Record" button
3. Open modal, fill form, submit
4. Click "Stop" recording
5. Check:
   - First Interaction to Paint (FIP): < 100ms
   - Longest Interaction to Paint (LIP): < 200ms
   - No janky animations (frame rate should be smooth 60fps)

---

## Test Results Checklist

- [ ] Modal opens on contact button click
- [ ] Modal closes with X button
- [ ] Modal closes on backdrop click
- [ ] Modal closes with Escape key
- [ ] Name validation works (min 2 chars)
- [ ] Email validation works (valid format)
- [ ] Phone validation works (optional, valid format if filled)
- [ ] Class dropdown opens/closes smoothly
- [ ] Privacy checkbox controls submit button
- [ ] Form submits successfully
- [ ] Loading state shows during submission
- [ ] Success state shows after 1-2 seconds
- [ ] Modal auto-closes after 3 seconds
- [ ] Email arrives in inbox
- [ ] Error handling works (offline test)
- [ ] Mobile layout is responsive
- [ ] Bilingual switching works
- [ ] Keyboard navigation works (Tab through fields)
- [ ] Focus states visible (gold rings)
- [ ] All animations smooth (no jank)
- [ ] Button hover states work

---

## Contact Modal Feature Summary

✅ Single-step form (like jeskojets)
✅ Class selection dropdown with existing class names
✅ Auto-close on success (3-second timer)
✅ Premium smooth transitions (Framer Motion)
✅ Bilingual support (RO/EN)
✅ Mobile optimized (full-width on mobile)
✅ Accessible (ARIA labels, keyboard nav, screen reader support)
✅ Form validation (React Hook Form)
✅ Error retry mechanism
✅ Formspree email integration

---

## Questions?

If tests fail, check:
1. Browser console for errors
2. Network tab for API requests
3. `.env.local` has correct Formspree ID
4. Dev server is running: `npm run dev`

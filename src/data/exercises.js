// Exercise database — compiled from multiple coaching sources
// Includes: muscles, form cues, common mistakes, YouTube video IDs, and Unsplash image queries

export const EXERCISES = {
  // ── PUSH / CHEST ─────────────────────────────────────────────────────────
  "Bench Press": {
    muscles: { primary: ["Pectoralis Major"], secondary: ["Anterior Deltoid", "Triceps"] },
    category: "Push",
    equipment: ["Barbell","Dumbbells","Smith Machine"],
    difficulty: "Intermediate",
    description: "The gold standard of chest training. A horizontal pressing movement that loads the pecs, shoulders, and triceps heavily. EMG data consistently shows it as the top chest mass builder.",
    formCues: [
      "5 points of contact: head, upper back, butt, and both feet",
      "Slight arch in lower back — pull shoulder blades down and together",
      "Grip slightly wider than shoulder-width",
      "Lower bar to lower chest, elbows at ~45° to torso",
      "Drive bar up and slightly back toward the rack",
      "Keep elbows slightly bent at the top to maintain tension"
    ],
    commonMistakes: [
      "Elbows flared 90° out — stresses rotator cuff and travels farther",
      "Bouncing bar off chest — reduces pec tension, injury risk",
      "Feet off the floor — kills leg drive and stability",
      "Bar path straight up instead of arced"
    ],
    proTip: "Create leg drive by pressing your feet into the floor. This transfers force through your whole body and adds 5–10% to your press.",
    videoId: "SCVCLChPQPs", // Alan Thrall bench press tutorial
    imageQuery: "barbell bench press chest workout gym"
  },
  "Incline Dumbbell Press": {
    muscles: { primary: ["Upper Pectoralis Major"], secondary: ["Anterior Deltoid", "Triceps"] },
    category: "Push",
    equipment: ["Dumbbells","Barbell"],
    difficulty: "Beginner",
    description: "The incline angle shifts emphasis to the upper pec fibers — the often underdeveloped clavicular head. Dumbbells allow a deeper stretch and fix imbalances between sides.",
    formCues: [
      "Set bench to 30–45° (higher = more shoulder, less chest)",
      "Palms facing forward, dumbbells at shoulder height",
      "Lower with control until elbows are slightly below bench level",
      "Press up and slightly inward, stopping just before lockout",
      "Keep wrists neutral — don't let them bend backward"
    ],
    commonMistakes: [
      "Too steep an incline (>45°) shifts load to shoulders",
      "Not lowering enough — short range = less stretch = less growth",
      "Rushing the eccentric (lowering) phase"
    ],
    proTip: "Aim for a 2-second lowering phase. The stretch under load is where upper pec growth happens.",
    videoId: "8iPEnn-ltC8", // Jeff Nippard incline
    imageQuery: "incline dumbbell press chest workout"
  },
  "Push-ups": {
    muscles: { primary: ["Pectoralis Major"], secondary: ["Triceps", "Anterior Deltoid", "Core"] },
    category: "Push",
    equipment: ["Bodyweight"],
    difficulty: "Beginner",
    description: "The most accessible chest exercise on earth. Studies show EMG activation comparable to bench press when performed correctly. The closed kinetic chain engages more stabilizers than bench.",
    formCues: [
      "Hands slightly wider than shoulder-width, fingers pointing forward",
      "Body forms a straight line from head to heels",
      "Brace core like you're about to take a punch",
      "Lower until chest touches or nearly touches the floor",
      "Elbows at ~45° to body, not flared wide",
      "Push up until arms are nearly straight"
    ],
    commonMistakes: [
      "Sagging hips — core not braced",
      "Head drooping forward — keep neck neutral",
      "Partial reps — not reaching full depth"
    ],
    proTip: "Elevate feet for more upper chest activation. Use a weighted vest or backpack for progressive overload.",
    videoId: "IODxDxX7oi4",
    imageQuery: "push ups bodyweight exercise form"
  },
  "Dips": {
    muscles: { primary: ["Lower Pectoralis Major", "Triceps"], secondary: ["Anterior Deltoid"] },
    category: "Push",
    equipment: ["Parallel Bars","Dip Machine"],
    difficulty: "Intermediate",
    description: "A compound pressing movement that heavily loads the lower chest and triceps. Leaning forward emphasizes chest; staying upright targets triceps more.",
    formCues: [
      "Lean slightly forward (15–30°) for chest emphasis",
      "Lower until shoulders are below elbows",
      "Keep elbows pointing slightly back, not flared",
      "Press up to near-lockout, squeeze chest at top",
      "Control the descent — don't drop"
    ],
    commonMistakes: [
      "Not going deep enough — elbows should reach 90°+",
      "Elbows flaring wide — stresses shoulder joint",
      "Rushing up without full chest engagement"
    ],
    proTip: "Add a dumbbell between your legs or use a dip belt for progressive overload once bodyweight becomes easy.",
    videoId: "2z8JmcrW-As",
    imageQuery: "dips chest triceps parallel bars exercise"
  },
  "Overhead Press": {
    muscles: { primary: ["Anterior Deltoid", "Medial Deltoid"], secondary: ["Triceps", "Traps", "Core"] },
    category: "Push",
    equipment: ["Barbell","Dumbbells"],
    difficulty: "Intermediate",
    description: "The king of shoulder mass builders. A vertical pressing pattern that taxes the entire deltoid complex and forces full-body stability. Also called the 'military press'.",
    formCues: [
      "Grip just outside shoulder-width, bar resting on upper chest",
      "Elbows slightly in front of bar (not pointing out)",
      "Take a breath, brace core, press bar straight up",
      "As bar passes head, push head forward through arms",
      "Lock out with ears in front of upper arms at top",
      "Lower bar back to clavicle with control"
    ],
    commonMistakes: [
      "Excessive lower back arch — rib flare, not pressing strength",
      "Bar path too far forward — causes stall at eye level",
      "Not locking out — missing full shoulder engagement",
      "Grip too wide — limits range of motion"
    ],
    proTip: "A slight hip extension at the start is okay — it's not a cheat, it's leg drive. But it should not be a push press (no knee bend).",
    videoId: "Femdz4aN9GU",
    imageQuery: "overhead press barbell shoulder workout military press"
  },
  "Lateral Raises": {
    muscles: { primary: ["Medial Deltoid"], secondary: ["Anterior Deltoid", "Trapezius"] },
    category: "Push",
    equipment: ["Dumbbells","Cable"],
    difficulty: "Beginner",
    description: "The primary isolation exercise for the medial (side) delt — the muscle responsible for shoulder width and the 3D 'capped' look. Light weight, strict form.",
    formCues: [
      "Start with dumbbells at sides, slight bend in elbows",
      "Raise arms out to the side until parallel to floor",
      "Lead with elbows, not wrists — think 'pour water from a jug'",
      "Pause briefly at the top, lower slowly (2–3 seconds)",
      "Keep torso still — no swinging"
    ],
    commonMistakes: [
      "Too heavy — momentum takes over, delts don't fire",
      "Thumbs pointing up — shifts load to front delt",
      "Going above shoulder height — trap takes over"
    ],
    proTip: "Cable lateral raises keep tension throughout the entire range of motion — superior to dumbbells for hypertrophy.",
    videoId: "3VcKaXpzqRo",
    imageQuery: "lateral raises shoulder dumbbell exercise medial delt"
  },
  "Cable Chest Fly": {
    muscles: { primary: ["Pectoralis Major"], secondary: ["Anterior Deltoid"] },
    category: "Push",
    equipment: ["Cable Machine"],
    difficulty: "Beginner",
    description: "Cables maintain constant tension across the entire arc of movement, unlike dumbbells that lose tension at the top. This makes cable flys uniquely effective for the peak contraction and pec stretch.",
    formCues: [
      "Set pulleys at shoulder height, stand in the middle",
      "Slight forward lean, soft bend in elbows throughout",
      "Bring hands together in a wide arc — like hugging a tree",
      "Squeeze pecs hard when hands meet at center",
      "Return slowly, feeling the stretch across the chest"
    ],
    commonMistakes: [
      "Bending elbows too much — turns into a press",
      "Letting the weight yank arms back — control the eccentric",
      "Shrugging shoulders — keep them down and back"
    ],
    proTip: "Adjust cable height to target different pec regions: high cables hit the lower chest; low cables hit the upper chest.",
    videoId: "Iwe6AmxVf7o",
    imageQuery: "cable chest fly pec workout machine"
  },
  "Dumbbell Chest Fly": {
    muscles: { primary: ["Pectoralis Major"], secondary: ["Anterior Deltoid"] },
    category: "Push",
    equipment: ["Dumbbells"],
    difficulty: "Beginner",
    description: "A classic isolation exercise that puts the pecs under a long stretch — a key driver of muscle growth. Best used after compound pressing to finish the chest with a pump.",
    formCues: [
      "Lie on bench, dumbbells above chest, palms facing each other",
      "Slight permanent bend in elbows — do not straighten",
      "Lower dumbbells out to sides in a wide arc",
      "Go until you feel a deep stretch across the chest",
      "Bring dumbbells back together squeezing pecs — don't clang them"
    ],
    commonMistakes: [
      "Too much elbow bend — becomes a press",
      "Going too heavy — forces you to bend arms and lose the stretch",
      "Rushing down without feeling the eccentric stretch"
    ],
    proTip: "Use lighter weight than you think. The goal is maximum stretch and pec tension, not moving heavy weight.",
    videoId: "eozdVDA78K0",
    imageQuery: "dumbbell chest fly exercise bench pec"
  },
  "Close-Grip Bench Press": {
    muscles: { primary: ["Triceps Brachii"], secondary: ["Pectoralis Major", "Anterior Deltoid"] },
    category: "Push",
    equipment: ["Barbell"],
    difficulty: "Intermediate",
    description: "A bench press variation that shifts emphasis dramatically onto the triceps by narrowing the grip. One of the best compound tricep builders — allows heavy loading.",
    formCues: [
      "Grip shoulder-width or slightly narrower (not too narrow — wrist stress)",
      "Keep elbows close to the body throughout",
      "Lower bar to lower chest/sternum",
      "Press up driving through the triceps",
      "Full lockout at the top to fully extend the triceps"
    ],
    commonMistakes: [
      "Grip too narrow — causes wrist and elbow pain",
      "Elbows flaring out — removes tricep emphasis",
      "Not locking out — missing the final tricep contraction"
    ],
    proTip: "Think 'elbows in, push the bar toward the ceiling.' That cue keeps triceps engaged throughout the full movement.",
    videoId: "nEF0bv2FW94",
    imageQuery: "close grip bench press triceps barbell"
  },
  "Skull Crushers": {
    muscles: { primary: ["Triceps Brachii"], secondary: ["Anterior Deltoid"] },
    category: "Push",
    equipment: ["EZ Bar","Barbell","Dumbbells"],
    difficulty: "Intermediate",
    description: "One of the best tricep isolation exercises, especially for the long head. The overhead position creates maximum stretch under load — a powerful stimulus for hypertrophy.",
    formCues: [
      "Lie on bench, hold bar above chest with straight arms",
      "Keep upper arms vertical and stationary throughout",
      "Hinge only at the elbows, lowering bar toward forehead",
      "Lower to just above the forehead or slightly behind the head",
      "Extend back to start by straightening elbows"
    ],
    commonMistakes: [
      "Upper arms drifting forward — loses tricep isolation",
      "Lowering too fast — risk of hitting your face",
      "Using too much weight — form breaks down"
    ],
    proTip: "An EZ bar reduces wrist strain significantly. You can also do these with dumbbells for a slightly different feel.",
    videoId: "d_KZxkY_0cM",
    imageQuery: "skull crushers EZ bar tricep exercise"
  },
  "Overhead Tricep Extension": {
    muscles: { primary: ["Triceps Brachii"], secondary: [] },
    category: "Push",
    equipment: ["Dumbbell","Cable"],
    difficulty: "Beginner",
    description: "The overhead position fully stretches the tricep long head — the largest of the three heads — under load. This stretch-loaded position produces superior long head hypertrophy.",
    formCues: [
      "Hold dumbbell overhead with both hands, arms straight",
      "Keep elbows pointing straight up, close to your head",
      "Lower dumbbell behind your head by hinging at elbows only",
      "Feel deep stretch in the back of the upper arm",
      "Extend back to start — don't flare elbows"
    ],
    commonMistakes: [
      "Elbows drifting outward — reduces long head tension",
      "Moving upper arms — should be stationary throughout",
      "Too heavy — causes elbows to flare badly"
    ],
    proTip: "Cable overhead extensions keep constant tension on the long head throughout — slightly superior to dumbbells for this movement.",
    videoId: "YbX7Wd8jQ-Q",
    imageQuery: "overhead tricep extension dumbbell exercise"
  },
  "Tricep Pushdown": {
    muscles: { primary: ["Triceps Brachii"], secondary: [] },
    category: "Push",
    equipment: ["Cable Machine"],
    difficulty: "Beginner",
    description: "A cable isolation exercise that targets all three tricep heads with constant tension. The rope attachment allows the wrists to rotate outward at the bottom for maximum contraction.",
    formCues: [
      "Set cable high, use rope or bar attachment",
      "Elbows pinned to sides — they must not move",
      "Push down until arms are fully extended",
      "At the bottom with rope: flare the ends apart to maximize contraction",
      "Return slowly — full range back to starting position"
    ],
    commonMistakes: [
      "Elbows drifting forward or backward — cheating the movement",
      "Using bodyweight by leaning over the cable",
      "Not fully extending at the bottom"
    ],
    proTip: "The rope attachment is superior to the bar because it allows full wrist pronation at lockout — hitting all three heads more completely.",
    videoId: "2-LAMcpzODU",
    imageQuery: "tricep pushdown cable machine rope exercise"
  },
  "Arnold Press": {
    muscles: { primary: ["Anterior Deltoid", "Medial Deltoid"], secondary: ["Triceps Brachii", "Posterior Deltoid"] },
    category: "Push",
    equipment: ["Dumbbells"],
    difficulty: "Intermediate",
    description: "Arnold Schwarzenegger's signature shoulder exercise. The rotation from palms-in to palms-out hits all three deltoid heads across the full range of motion — more complete than a standard press.",
    formCues: [
      "Start with dumbbells at shoulder height, palms facing you",
      "As you press up, rotate wrists outward (palms forward at top)",
      "Full lockout overhead, then reverse the rotation on the way down",
      "Keep core tight — don't arch lower back",
      "Control both the press and the rotation"
    ],
    commonMistakes: [
      "Rotating too early or too late — rotation should be smooth and continuous",
      "Arching lower back excessively",
      "Using momentum — keep the movement strict"
    ],
    proTip: "The rotation recruits the anterior deltoid more than a standard press. Start lighter than you think until you master the rotation pattern.",
    videoId: "6Z15_WdXmVw",
    imageQuery: "arnold press dumbbell shoulder exercise"
  },
  "Front Raise": {
    muscles: { primary: ["Anterior Deltoid"], secondary: ["Medial Deltoid", "Pectoralis Major"] },
    category: "Push",
    equipment: ["Dumbbells","Plate","Cable"],
    difficulty: "Beginner",
    description: "A direct anterior deltoid isolation exercise. Note: the anterior delt already gets heavy work from bench pressing and overhead pressing, so this is usually unnecessary — but useful for weak front delts.",
    formCues: [
      "Stand tall, dumbbells in front of thighs, palms facing down",
      "Raise arms forward to shoulder height — no higher",
      "Keep a slight bend in elbows throughout",
      "Control the lowering — don't drop",
      "Keep torso still — no swinging"
    ],
    commonMistakes: [
      "Going above shoulder height — traps take over",
      "Swinging body for momentum",
      "Internal shoulder rotation — try neutral grip instead"
    ],
    proTip: "If you bench press and overhead press regularly, your front delts are already well-developed. Prioritize lateral raises and face pulls over front raises.",
    videoId: "sOoBnmFXxoA",
    imageQuery: "front raise dumbbell shoulder anterior deltoid"
  },
  "Tricep Dips": {
    muscles: { primary: ["Triceps Brachii"], secondary: ["Pectoralis Minor", "Anterior Deltoid"] },
    category: "Push",
    equipment: ["Bench","Chair"],
    difficulty: "Beginner",
    description: "A bodyweight tricep isolation movement using a bench or chair. Targets all three heads of the tricep, especially the long head.",
    formCues: [
      "Hands on bench behind you, fingers pointing forward",
      "Feet out in front, legs straight or bent",
      "Lower body by bending elbows — keep them pointing straight back",
      "Lower until upper arms are parallel to the floor",
      "Press up to start without locking elbows completely"
    ],
    commonMistakes: [
      "Elbows flaring to the sides — shoulder stress",
      "Not going deep enough",
      "Leaning too far forward — shifts to chest"
    ],
    proTip: "Place a weight plate on your lap for added resistance as you progress.",
    videoId: "0326dy_-CzM",
    imageQuery: "tricep dips bench exercise bodyweight arms"
  },

  // ── PULL / BACK ──────────────────────────────────────────────────────────
  "Pull-ups": {
    muscles: { primary: ["Latissimus Dorsi"], secondary: ["Rhomboids", "Trapezius", "Biceps Brachii"] },
    category: "Pull",
    equipment: ["Pull-up Bar"],
    difficulty: "Intermediate",
    description: "EMG data shows pull-ups produce 117% MVC in the lats — more than lat pulldowns or rows. Despite being bodyweight, most people lift more on pull-ups than any pulldown machine.",
    formCues: [
      "Grip slightly wider than shoulder-width, overhand grip",
      "Start from dead hang — full arm extension",
      "Initiate by depressing shoulder blades down and back",
      "Pull elbows toward your hips, not just bending arms",
      "Chin clears bar at top (or chest if chest-to-bar)",
      "Lower slowly — 2–3 second eccentric"
    ],
    commonMistakes: [
      "Not starting from full dead hang — loses lat stretch",
      "Kipping — momentum-based, not strength-based",
      "Chin just reaching bar — partial range",
      "Shrugging shoulders up instead of pulling them down first"
    ],
    proTip: "Can't do a pull-up yet? Do 3–5 sets of dead hangs (30s) and negative pull-ups (jump to bar, lower slowly over 5s). You'll get your first pull-up within weeks.",
    videoId: "eGo4IYlbE5g",
    imageQuery: "pull ups back exercise lats overhand grip"
  },
  "Barbell Row": {
    muscles: { primary: ["Latissimus Dorsi", "Rhomboids"], secondary: ["Trapezius", "Rear Deltoid", "Biceps"] },
    category: "Pull",
    equipment: ["Barbell","Dumbbells"],
    difficulty: "Intermediate",
    description: "A heavy compound pulling movement that builds serious back thickness. The hip-hinge position loads the posterior chain while the rowing motion targets the entire back.",
    formCues: [
      "Hinge at hips until torso is ~45° or parallel to floor",
      "Bar hanging below chest, knees slightly bent",
      "Pull bar to lower chest/upper abdomen — not neck",
      "Lead with elbows, squeeze shoulder blades together at top",
      "Lower with control, arms fully extending",
      "Keep lower back flat throughout — no rounding"
    ],
    commonMistakes: [
      "Jerking/using momentum — lower back does the work",
      "Pulling to the wrong spot — too high strains shoulders",
      "Standing too upright — becomes a shrug, not a row",
      "Rounded lower back under load — injury risk"
    ],
    proTip: "Touch your shirt — not your stomach. The bar path should hit your lower chest for maximum lat engagement.",
    videoId: "FWJR5Ve8bnQ",
    imageQuery: "barbell bent over row back exercise"
  },
  "Deadlift": {
    muscles: { primary: ["Glutes", "Hamstrings", "Erector Spinae"], secondary: ["Traps", "Lats", "Quads", "Forearms"] },
    category: "Pull",
    equipment: ["Barbell","Trap Bar"],
    difficulty: "Advanced",
    description: "The ultimate test of total-body strength. The deadlift loads more muscle mass simultaneously than virtually any other exercise. It builds a powerful posterior chain, grip, and core.",
    formCues: [
      "Bar over mid-foot, feet hip-width apart",
      "Hinge down and grip bar just outside legs",
      "Pull slack out of bar — feel lats 'engage' before lifting",
      "Take a deep breath, brace core (360° pressure outward)",
      "Push floor away with legs while keeping bar close to shins",
      "Lock hips and knees out simultaneously at the top",
      "Hinge back down, controlling the descent"
    ],
    commonMistakes: [
      "Rounding the lower back — spinal flexion under load",
      "Bar drifting away from shins — increases lever arm",
      "Jerking the bar — skips leg drive, all lower back",
      "Looking up too aggressively — neck strain",
      "Not bracing core before the lift"
    ],
    proTip: "Before you pull, 'push the ground away' with your legs instead of thinking about picking the bar up. This cue activates leg drive and keeps the back flat.",
    videoId: "op9kVnSso6Q",
    imageQuery: "deadlift barbell powerlifting form posterior chain"
  },
  "Romanian Deadlift": {
    muscles: { primary: ["Hamstrings", "Glutes"], secondary: ["Erector Spinae", "Adductors"] },
    category: "Pull",
    equipment: ["Barbell","Dumbbells"],
    difficulty: "Intermediate",
    description: "The RDL is one of the most effective hamstring builders. Unlike the conventional deadlift, it emphasizes the hip hinge and eccentric stretch of the hamstrings over the glutes.",
    formCues: [
      "Hold bar at hip height, soft bend in knees",
      "Hinge at hips, pushing them backward as bar descends",
      "Feel a stretch in hamstrings (usually at mid-shin)",
      "Keep back flat, chest up throughout",
      "Drive hips forward to return to start"
    ],
    commonMistakes: [
      "Squatting the movement — bending knees too much, losing hamstring tension",
      "Rounding the back at the bottom",
      "Going too deep — compromises back position"
    ],
    proTip: "The RDL ends where your hamstrings stop stretching — not when the bar hits the floor. Different body types will have different ranges.",
    videoId: "JCXUYuzwNrM",
    imageQuery: "romanian deadlift RDL hamstrings exercise barbell"
  },
  "Cable Row": {
    muscles: { primary: ["Rhomboids", "Middle Trapezius"], secondary: ["Latissimus Dorsi", "Rear Deltoid", "Biceps"] },
    category: "Pull",
    equipment: ["Cable Machine"],
    difficulty: "Beginner",
    description: "A seated cable row maintains constant tension throughout the entire range of motion — unlike free weights. Excellent for building back thickness and correcting posture.",
    formCues: [
      "Sit with slight bend in knees, torso upright",
      "Start with arms extended, feeling the stretch in shoulder blades",
      "Row by pulling elbows back, leading with the elbow not the wrist",
      "Squeeze shoulder blades together at the fully contracted position",
      "Hold for 1 second at peak contraction",
      "Return slowly with control"
    ],
    commonMistakes: [
      "Leaning back excessively — momentum, not muscle",
      "Rounding forward on the return — compresses spine",
      "Pulling with biceps instead of initiating with back"
    ],
    proTip: "Think 'elbows in pockets' — this cue keeps the lat engaged rather than just squeezing shoulder blades.",
    videoId: "xQNrFHEMhI4",
    imageQuery: "seated cable row back exercise machine"
  },
  "Face Pull": {
    muscles: { primary: ["Rear Deltoid", "Rotator Cuff"], secondary: ["Middle Trapezius", "Rhomboids"] },
    category: "Pull",
    equipment: ["Cable Machine"],
    difficulty: "Beginner",
    description: "Criminally underutilized. The face pull is one of the best shoulder health exercises — it directly targets the rear delt and external rotators, counteracting the forward-rounded posture from too much pressing.",
    formCues: [
      "Set cable at face height, use rope attachment",
      "Step back until arms are extended, slight lean back",
      "Pull rope toward your face, elbows flaring out and up",
      "End position: hands by ears, elbows at or above shoulder height",
      "External rotate at the end — 'show your armpits'"
    ],
    commonMistakes: [
      "Pulling to the neck instead of the face",
      "Elbows dropping below shoulder height",
      "Too much weight — form breaks down"
    ],
    proTip: "Do 15–20 reps of face pulls for every pressing set you do. It's injury prevention and shoulder health in one movement.",
    videoId: "HSoHeSt5Wck",
    imageQuery: "face pull cable machine rear delt exercise"
  },
  "Bicep Curl": {
    muscles: { primary: ["Biceps Brachii"], secondary: ["Brachialis", "Brachioradialis"] },
    category: "Pull",
    equipment: ["Dumbbells","Barbell","Cable","EZ Bar"],
    difficulty: "Beginner",
    description: "The quintessential arm isolation exercise. Works both heads of the bicep and the brachialis, which pushes the bicep up for a higher peak.",
    formCues: [
      "Stand tall, dumbbells at sides, palms facing forward",
      "Keep elbows pinned to sides throughout — do not swing",
      "Curl by bending elbow, not by rocking torso",
      "Supinate (rotate) the wrist at the top for full bicep contraction",
      "Lower fully — don't stop halfway"
    ],
    commonMistakes: [
      "Swinging the body — momentum robs bicep of work",
      "Elbows drifting forward — turns into a front raise",
      "Not fully extending at the bottom — loses stretch"
    ],
    proTip: "Hammer curls (neutral grip) emphasize the brachialis and brachioradialis — adding them builds arm thickness, not just peak.",
    videoId: "ykJmrZ5v0Oo",
    imageQuery: "bicep curl dumbbell arm exercise"
  },

  "Chin-ups": {
    muscles: { primary: ["Latissimus Dorsi", "Biceps Brachii"], secondary: ["Rhomboids", "Posterior Deltoid"] },
    category: "Pull",
    equipment: ["Pull-up Bar"],
    difficulty: "Intermediate",
    description: "The supinated (underhand) grip shifts more load onto the biceps compared to pull-ups, while still building excellent lat width. A great bridge exercise between rows and pull-ups.",
    formCues: [
      "Underhand grip, hands shoulder-width apart",
      "Dead hang start — full arm extension",
      "Pull chest toward the bar, elbows driving down",
      "Chin above bar at the top",
      "Lower with control to full hang"
    ],
    commonMistakes: [
      "Half reps — not reaching full extension at the bottom",
      "Kipping — uses momentum rather than strength",
      "Only thinking about pulling with arms — initiate with lats"
    ],
    proTip: "Chin-ups are typically easier than pull-ups for beginners due to greater bicep involvement. Use them to build initial pulling strength.",
    videoId: "brhRXlOhsAM",
    imageQuery: "chin up underhand grip back exercise"
  },
  "Lat Pulldown": {
    muscles: { primary: ["Latissimus Dorsi"], secondary: ["Rhomboids", "Biceps Brachii", "Posterior Deltoid"] },
    category: "Pull",
    equipment: ["Cable Machine"],
    difficulty: "Beginner",
    description: "The machine equivalent of pull-ups. Allows beginners to train lat pulling with any weight, and lets advanced lifters add volume beyond what bodyweight allows. EMG activation is slightly lower than pull-ups.",
    formCues: [
      "Grip bar slightly wider than shoulder-width, overhand",
      "Slight lean back (15–20°), chest tall",
      "Pull bar to upper chest — not behind the neck",
      "Lead with elbows — drive them down and back",
      "Squeeze lats at the bottom, return slowly"
    ],
    commonMistakes: [
      "Pulling behind the neck — serious cervical spine risk",
      "Leaning back too far — turns into a row",
      "Shrugging shoulders up at the top — lose lat tension"
    ],
    proTip: "Imagine you're trying to put your elbows in your back pockets. This cue activates the lats far better than just thinking about pulling the bar down.",
    videoId: "CAwf7n6Luuc",
    imageQuery: "lat pulldown cable machine back exercise"
  },
  "Single-Arm Dumbbell Row": {
    muscles: { primary: ["Latissimus Dorsi", "Rhomboids"], secondary: ["Posterior Deltoid", "Biceps Brachii", "Trapezius"] },
    category: "Pull",
    equipment: ["Dumbbell"],
    difficulty: "Beginner",
    description: "One of the most effective back builders. The unilateral setup allows heavier loading per side and a greater range of motion than the barbell row, with better ability to feel the lat working.",
    formCues: [
      "Place one knee and hand on a bench for support",
      "Back flat, parallel to floor, dumbbell hanging below shoulder",
      "Row elbow up toward the hip — not toward the shoulder",
      "Squeeze the lat hard at the top of the movement",
      "Lower with full arm extension to stretch the lat"
    ],
    commonMistakes: [
      "Rowing toward the shoulder instead of the hip — turns into a rear delt exercise",
      "Rotating the torso to cheat the weight up",
      "Not fully extending at the bottom — loses stretch"
    ],
    proTip: "Think about driving your elbow into your back pocket. This cue keeps the lat engaged and prevents the shoulder from taking over.",
    videoId: "roCP6wCXPqo",
    imageQuery: "dumbbell single arm row back exercise"
  },
  "T-Bar Row": {
    muscles: { primary: ["Latissimus Dorsi", "Rhomboids", "Trapezius"], secondary: ["Posterior Deltoid", "Biceps Brachii", "Erector Spinae"] },
    category: "Pull",
    equipment: ["T-Bar Row Machine","Landmine"],
    difficulty: "Intermediate",
    description: "A heavy compound back exercise that allows greater loading than dumbbell rows. The neutral grip reduces bicep involvement and keeps more tension on the mid-back and lats.",
    formCues: [
      "Straddle the bar, hinge at hips to ~45°, chest up",
      "Grip handles with both hands, arms extended",
      "Row bar into the chest/upper abs — drive elbows back",
      "Squeeze rhomboids together at the top",
      "Lower fully to stretch before the next rep"
    ],
    commonMistakes: [
      "Standing too upright — loses lat engagement",
      "Using momentum and jerking the weight",
      "Rounding the lower back under load"
    ],
    proTip: "Chest-supported T-bar rows eliminate lower back fatigue and let you isolate the back fully — great option if lower back is a limiting factor.",
    videoId: "j3Igk5nyZE4",
    imageQuery: "T-bar row back exercise barbell"
  },
  "Hammer Curl": {
    muscles: { primary: ["Brachialis", "Brachioradialis"], secondary: ["Biceps Brachii"] },
    category: "Pull",
    equipment: ["Dumbbells","Cable"],
    difficulty: "Beginner",
    description: "The neutral (hammer) grip shifts emphasis to the brachialis — a muscle that lies underneath the bicep and when developed, pushes the bicep up for a bigger peak. Also builds forearm thickness.",
    formCues: [
      "Hold dumbbells at sides with neutral grip (thumbs up)",
      "Keep elbows pinned to sides throughout",
      "Curl dumbbells up keeping the neutral grip — don't rotate",
      "Hold briefly at the top, lower with control",
      "Full extension at the bottom each rep"
    ],
    commonMistakes: [
      "Rotating the wrist at the top — defeats the purpose",
      "Swinging the elbows forward — reduces tension",
      "Going too fast — eliminate momentum"
    ],
    proTip: "Alternating hammer curls allow slight body rotation per rep, letting you use slightly more weight. Great for a strength-focused arm session.",
    videoId: "zC3nLlEvin4",
    imageQuery: "hammer curl neutral grip dumbbell arm"
  },
  "Preacher Curl": {
    muscles: { primary: ["Biceps Brachii"], secondary: ["Brachialis"] },
    category: "Pull",
    equipment: ["EZ Bar","Dumbbell"],
    difficulty: "Beginner",
    description: "The preacher bench locks the upper arms in place, eliminating the ability to cheat. This forces the bicep to do all the work — especially effective for the lower portion of the muscle.",
    formCues: [
      "Upper arms flat on the pad, armpits at the top edge",
      "Grip EZ bar at the inner curl",
      "Lower bar to near full extension — don't hyperextend",
      "Curl up until forearms are slightly past vertical",
      "No rocking — upper arms stay on pad throughout"
    ],
    commonMistakes: [
      "Lifting the upper arms off the pad — defeats the exercise",
      "Locking out hard at the bottom — elbow joint strain",
      "Going too heavy — causes form breakdown"
    ],
    proTip: "Spider curls (lying chest-down on an incline bench) provide an even greater stretch of the bicep long head than preacher curls.",
    videoId: "fIWP-FRFNU0",
    imageQuery: "preacher curl EZ bar bicep isolation"
  },
  "Concentration Curl": {
    muscles: { primary: ["Biceps Brachii"], secondary: ["Brachialis"] },
    category: "Pull",
    equipment: ["Dumbbell"],
    difficulty: "Beginner",
    description: "Studies show the concentration curl produces the highest bicep EMG activation of any curl variation. The braced upper arm eliminates all cheating, forcing maximal bicep contraction.",
    formCues: [
      "Sit on bench, lean forward, brace upper arm against inner thigh",
      "Dumbbell hanging at full extension",
      "Curl up fully, supinating (rotating) wrist at the top",
      "Hold the peak contraction for 1 second",
      "Lower slowly — full extension every rep"
    ],
    commonMistakes: [
      "Arm not braced properly — allows swinging",
      "Not supinating at the top — misses peak bicep contraction",
      "Moving too fast through the full range"
    ],
    proTip: "Squeeze as hard as possible at the top. The isometric contraction at peak is where the bicep does its most intense work.",
    videoId: "Jvj2wV0vOYU",
    imageQuery: "concentration curl dumbbell bicep seated"
  },
  "Reverse Curl": {
    muscles: { primary: ["Brachioradialis", "Brachialis"], secondary: ["Biceps Brachii"] },
    category: "Pull",
    equipment: ["Barbell","Dumbbells","EZ Bar"],
    difficulty: "Beginner",
    description: "An overhand-grip curl that targets the brachioradialis and builds thick, strong forearms. Often neglected, but essential for complete arm development and grip strength.",
    formCues: [
      "Hold bar with overhand (pronated) grip, shoulder-width",
      "Keep elbows pinned to sides",
      "Curl bar up keeping the overhand grip throughout",
      "Go as high as full range allows — typically less than regular curl",
      "Lower with control all the way down"
    ],
    commonMistakes: [
      "Wrists breaking/bending backward — keep them neutral",
      "Using too much weight — this is harder than regular curls",
      "Elbows drifting forward"
    ],
    proTip: "Wrist curls paired with reverse curls provide complete forearm development — the reverse targets the top of the forearm, wrist curls the underside.",
    videoId: "nYQxScY9tXM",
    imageQuery: "reverse curl barbell forearm exercise"
  },

  "Cable Wrist Curl": {
    muscles: { primary: ["Flexor Carpi Radialis", "Flexor Carpi Ulnaris"], secondary: ["Palmaris Longus", "Brachioradialis"] },
    category: "Pull",
    equipment: ["Cable Machine"],
    difficulty: "Beginner",
    description: "A forearm isolation exercise using a low cable for constant tension. Targets the forearm flexors — the muscles on the underside of the forearm that are often underdeveloped compared to the extensors.",
    formCues: [
      "Kneel or sit facing a low cable, straight bar or rope attachment",
      "Rest forearms on your thighs, palms facing up, wrists hanging off the knees",
      "Curl wrists upward as far as range allows — squeeze forearm flexors at top",
      "Lower slowly to full wrist extension — let the weight stretch the forearm",
      "Keep upper arms and elbows completely stationary"
    ],
    commonMistakes: [
      "Moving the elbows — only the wrist should flex",
      "Not going to full extension — the stretch is where growth happens",
      "Too much weight — small muscles fatigue quickly, form breaks"
    ],
    proTip: "Pair with reverse curls (overhand grip) to develop both sides of the forearm equally. Most people only train the flexors and wonder why their forearms don't grow.",
    videoId: "pYcpY20QaE8",
    imageQuery: "cable wrist curl forearm exercise low pulley"
  },

  // ── LEGS ─────────────────────────────────────────────────────────────────
  "Squat": {
    muscles: { primary: ["Quadriceps", "Glutes"], secondary: ["Hamstrings", "Adductors", "Core", "Erector Spinae"] },
    category: "Legs",
    equipment: ["Barbell","Smith Machine"],
    difficulty: "Advanced",
    description: "Widely called 'the king of exercises.' The barbell back squat loads more total muscle mass than virtually any other exercise and triggers the greatest anabolic hormonal response.",
    formCues: [
      "Bar across upper traps (high bar) or rear delts (low bar)",
      "Feet shoulder-width apart, toes out 15–30°",
      "Take a breath into your belly, brace core 360°",
      "Break at hips and knees simultaneously",
      "Keep knees tracking over toes throughout",
      "Descend until thighs are parallel to floor or below",
      "Drive through the whole foot, not just heels"
    ],
    commonMistakes: [
      "Knees caving inward (valgus collapse) — push knees out",
      "Heels coming off the floor — ankle mobility issue",
      "Forward torso lean — usually weak core or tight ankles",
      "Half reps — not reaching depth",
      "Losing brace at the bottom — spinal flexion"
    ],
    proTip: "Film your squat from the side. If you can see your heels, your bar path is too far forward. The bar should track over mid-foot throughout.",
    videoId: "ultWZbUMPL8",
    imageQuery: "barbell back squat legs exercise powerlifting"
  },
  "Leg Press": {
    muscles: { primary: ["Quadriceps", "Glutes"], secondary: ["Hamstrings", "Calves"] },
    category: "Legs",
    equipment: ["Machine"],
    difficulty: "Beginner",
    description: "The leg press allows heavy quad and glute loading with reduced spinal stress. Foot position changes muscle emphasis: high/wide = glutes and hamstrings; low/narrow = quads.",
    formCues: [
      "Place feet hip-width apart at mid-plate height",
      "Keep lower back flat against the pad — no rounding",
      "Lower platform until knees form ~90° angle",
      "Do not lock knees out at the top",
      "Press through heels and mid-foot — not toes"
    ],
    commonMistakes: [
      "Too much weight, cutting range of motion short",
      "Lower back lifting off the pad — compromises spine",
      "Knees caving inward on the press"
    ],
    proTip: "A high, wide foot placement on the leg press produces glute EMG comparable to hip thrusts — great for targeting glutes without extra equipment.",
    videoId: "IZxyjW7MPJQ",
    imageQuery: "leg press machine quadriceps glutes exercise"
  },
  "Lunges": {
    muscles: { primary: ["Quadriceps", "Glutes"], secondary: ["Hamstrings", "Calves", "Core"] },
    category: "Legs",
    equipment: ["Bodyweight","Dumbbells","Barbell"],
    difficulty: "Beginner",
    description: "A unilateral (single-leg) exercise that builds balance, coordination, and addresses left-right imbalances. Walking lunges also add a functional movement pattern.",
    formCues: [
      "Step forward with one foot, hip-width stance",
      "Lower back knee toward floor — 1–2 inches off ground",
      "Front shin stays vertical — knee doesn't travel past toes",
      "Keep torso upright throughout",
      "Push through front heel to return to start"
    ],
    commonMistakes: [
      "Front knee caving inward",
      "Torso leaning forward",
      "Taking too short a step — knee shoots past toes"
    ],
    proTip: "Bulgarian split squats (rear foot elevated) are a harder version that targets quads and glutes more intensely — excellent progression.",
    videoId: "QOVaHwm-Q6U",
    imageQuery: "lunges exercise legs glutes bodyweight dumbbell"
  },
  "Leg Extension": {
    muscles: { primary: ["Quadriceps"] },
    category: "Legs",
    equipment: ["Machine"],
    difficulty: "Beginner",
    description: "The only true quad isolation exercise. Targets the vastus medialis (VMO) — the teardrop muscle just above the knee — which is notoriously hard to hit with compound movements.",
    formCues: [
      "Adjust seat so knees align with machine's pivot point",
      "Grip handles for stability — don't pull on them",
      "Extend legs fully — squeeze quads hard at the top",
      "Lower slowly (3 seconds) under control — feel the stretch"
    ],
    commonMistakes: [
      "Seat too far back — knees don't bend enough",
      "Slamming the weight down — no eccentric control"
    ],
    proTip: "Perform 1–2 sets of leg extensions before squats as a 'pre-exhaust' to improve quad mind-muscle connection.",
    videoId: "YyvSfVjQeL0",
    imageQuery: "leg extension machine quadriceps exercise isolation"
  },
  "Calf Raise": {
    muscles: { primary: ["Gastrocnemius", "Soleus"] },
    category: "Legs",
    equipment: ["Machine","Barbell","Dumbbells"],
    difficulty: "Beginner",
    description: "Direct calf training. Straight-knee raises target the gastrocnemius (outer, visible calf); seated raises with bent knees target the deeper soleus. Both must be trained for complete calves.",
    formCues: [
      "Stand on the edge of a raised platform, heels hanging off",
      "Drop heels below the level of the platform for full stretch",
      "Rise all the way onto your toes — full range is critical for calves",
      "Pause 1 second at the top, squeeze hard",
      "Lower slowly — calves respond best to slow eccentrics"
    ],
    commonMistakes: [
      "Bouncing — zero stretch, no growth stimulus",
      "Not going full range — calves need full ROM more than any muscle",
      "Rushing — calves need slow, controlled reps"
    ],
    proTip: "Calves have a high proportion of slow-twitch fibers — they respond best to higher rep ranges (15–25) with slow tempos.",
    videoId: "Euf-RJtyUaU",
    imageQuery: "calf raise standing exercise gastrocnemius soleus"
  },
  "Bulgarian Split Squat": {
    muscles: { primary: ["Quadriceps", "Glutes"], secondary: ["Hamstrings", "Core", "Adductors"] },
    category: "Legs",
    equipment: ["Dumbbells","Barbell"],
    difficulty: "Intermediate",
    description: "Dr. Mike Israetel calls this 'the best leg exercise most people aren't doing.' The rear foot elevation forces the front leg to do virtually all the work — incredible quad and glute overload per leg.",
    formCues: [
      "Rear foot elevated on bench, front foot 2–3 feet ahead",
      "Torso upright — don't lean too far forward",
      "Lower until rear knee nearly touches the floor",
      "Front shin stays relatively vertical",
      "Drive up through the front heel to return to start"
    ],
    commonMistakes: [
      "Front foot too close — causes excessive forward knee travel",
      "Leaning forward too much — shifts load from quads to hip flexors",
      "Rear knee slamming the floor — control the descent"
    ],
    proTip: "Hold dumbbells at sides for a balanced load. Once comfortable, a barbell adds significantly more overload for serious quad and glute development.",
    videoId: "2C-uNgKwPLE",
    imageQuery: "bulgarian split squat rear foot elevated dumbbell legs"
  },
  "Hack Squat": {
    muscles: { primary: ["Quadriceps"], secondary: ["Glutes", "Hamstrings"] },
    category: "Legs",
    equipment: ["Machine","Barbell"],
    difficulty: "Intermediate",
    description: "The hack squat machine allows a deep, knee-dominant squat that hammers the quads — especially the vastus lateralis (outer quad sweep). A favorite for quad hypertrophy when back fatigue limits barbell squatting.",
    formCues: [
      "Feet low and narrow on the platform for maximum quad emphasis",
      "Back flat against the pad throughout",
      "Descend until thighs are at or past parallel",
      "Drive through the full foot to press back up",
      "Don't lock knees out fully at the top — maintain tension"
    ],
    commonMistakes: [
      "Feet too high — shifts to glutes and hamstrings",
      "Butt winking (lower back rounding at depth)",
      "Locking knees at top — removes tension from quads"
    ],
    proTip: "A narrow, low foot position on the hack squat is one of the most effective ways to target the outer quad sweep for that 'teardrop' look.",
    videoId: "0tn5K9NlCfo",
    imageQuery: "hack squat machine quad exercise legs"
  },
  "Goblet Squat": {
    muscles: { primary: ["Quadriceps", "Glutes"], secondary: ["Core", "Hamstrings", "Adductors"] },
    category: "Legs",
    equipment: ["Kettlebell","Dumbbell"],
    difficulty: "Beginner",
    description: "The best squat variation for beginners. The front-loaded weight naturally counterbalances the body, making it easier to hit depth with a more upright torso. Also excellent as a warm-up for barbell squats.",
    formCues: [
      "Hold kettlebell at chest height, elbows pointing down",
      "Feet slightly wider than hip-width, toes out 30°",
      "Squat down, keeping chest tall — elbows track inside knees",
      "Descend until thighs are parallel or below",
      "Drive up through heels, maintaining upright posture"
    ],
    commonMistakes: [
      "Letting elbows drop — causes torso to fold forward",
      "Knees caving inward — actively push knees out",
      "Not reaching depth — goblet squat is forgiving, go low"
    ],
    proTip: "At the bottom of the squat, use your elbows to push your knees outward. This opens the hips and teaches the correct squat mechanics.",
    videoId: "MxsFDhcyFyE",
    imageQuery: "goblet squat kettlebell beginner leg exercise"
  },
  "Leg Curl": {
    muscles: { primary: ["Hamstrings"], secondary: ["Calves", "Glutes"] },
    category: "Legs",
    equipment: ["Machine","Dumbbells"],
    difficulty: "Beginner",
    description: "The primary isolation exercise for the hamstrings. While RDLs and deadlifts train the hamstrings in a lengthened position, leg curls train them in a shortened position — both are needed for complete development.",
    formCues: [
      "Lie face down on machine, pad just above heels",
      "Keep hips flat on the pad throughout",
      "Curl legs toward glutes as far as possible",
      "Squeeze hamstrings hard at the peak of contraction",
      "Lower slowly — a 3-second eccentric is very effective here"
    ],
    commonMistakes: [
      "Hips rising off the pad — lower back takes over",
      "Using momentum — swinging the legs up",
      "Stopping short of full range — hamstrings need full contraction"
    ],
    proTip: "Nordic curls (body lowering forward from a kneeling position) are an advanced hamstring exercise with exceptional injury-prevention properties — worth adding once you're strong enough.",
    videoId: "1Tq3QdYUuHs",
    imageQuery: "lying leg curl machine hamstrings exercise"
  },
  "Seated Calf Raise": {
    muscles: { primary: ["Soleus"], secondary: ["Gastrocnemius"] },
    category: "Legs",
    equipment: ["Machine","Dumbbells","Barbell"],
    difficulty: "Beginner",
    description: "The seated position bends the knee, which slackens the gastrocnemius, isolating the deeper soleus muscle. The soleus is a slow-twitch dominant muscle crucial for lower leg thickness.",
    formCues: [
      "Sit with knees at 90°, pad across lower thighs",
      "Feet on platform, heels hanging off",
      "Drop heels below platform level for full stretch",
      "Rise onto toes as high as possible",
      "Hold 1–2 seconds at the top, lower slowly"
    ],
    commonMistakes: [
      "Bouncing — no time in the stretch position",
      "Partial range — calves need full stretch to respond",
      "Rushing the reps — calves respond to slow, controlled tempo"
    ],
    proTip: "Train seated (soleus) AND standing (gastrocnemius) calf raises in every leg session. Most people only do standing raises and wonder why their calves won't grow.",
    videoId: "JbyjNymZOt0",
    imageQuery: "seated calf raise machine soleus exercise"
  },
  "Step-ups": {
    muscles: { primary: ["Quadriceps", "Glutes"], secondary: ["Hamstrings", "Calves", "Core"] },
    category: "Legs",
    equipment: ["Dumbbells","Barbell","Bodyweight"],
    difficulty: "Beginner",
    description: "A functional unilateral exercise that builds quad and glute strength while improving balance and coordination. The height of the box changes the emphasis — higher box targets glutes more.",
    formCues: [
      "Stand facing a bench or box (knee height or slightly higher)",
      "Step up with one foot, drive through that heel to rise",
      "Bring both feet to the top, stand tall",
      "Step back down with control — same foot leads back",
      "Complete all reps on one side before switching"
    ],
    commonMistakes: [
      "Pushing off the back foot — removes load from front leg",
      "Box too low — reduces range of motion",
      "Leaning too far forward"
    ],
    proTip: "Hold the step-up for 1 second at the top on one leg. This eliminates any assist from the trailing foot and maximises glute activation.",
    videoId: "WCFCdxzFBa4",
    imageQuery: "step ups box dumbbell leg exercise"
  },
  "Hip Thrust": {
    muscles: { primary: ["Gluteus Maximus"], secondary: ["Hamstrings", "Adductors", "Core"] },
    category: "Legs",
    equipment: ["Barbell","Dumbbells","Machine"],
    difficulty: "Intermediate",
    description: "Research shows hip thrusts produce the highest glute EMG activation of any exercise — beating squats and deadlifts. Essential for glute development, especially the upper glutes.",
    formCues: [
      "Upper back against a bench, bar across hip crease (use pad)",
      "Feet hip-width apart, flat on the floor",
      "Drive through heels, squeeze glutes hard at the top",
      "At the top: shins vertical, torso parallel to floor",
      "Don't over-extend the lower back — posterior pelvic tilt at top"
    ],
    commonMistakes: [
      "Driving with lower back instead of glutes",
      "Feet too close or too far — changes muscle emphasis",
      "Bar rolling forward — pad and grip are essential"
    ],
    proTip: "Pause 2 seconds at the top with a hard glute squeeze. This eliminates momentum and forces the glute to do all the work.",
    videoId: "xDmFkJxPzeM",
    imageQuery: "hip thrust barbell glute exercise gym"
  },

  // ── CORE ──────────────────────────────────────────────────────────────────
  "Plank": {
    muscles: { primary: ["Transverse Abdominis", "Rectus Abdominis"], secondary: ["Obliques", "Glutes", "Shoulders"] },
    category: "Full",
    equipment: ["Bodyweight"],
    difficulty: "Beginner",
    description: "The best anti-extension core exercise. Trains the core's primary function — resisting spinal movement — rather than creating it. The foundation of core stability.",
    formCues: [
      "Forearms on floor, elbows below shoulders",
      "Body forms a straight line — no sagging hips, no raised butt",
      "Squeeze glutes and quads — the whole body is tense",
      "Breathe steadily — do not hold your breath",
      "Gaze at the floor, neck neutral"
    ],
    commonMistakes: [
      "Hips sagging — losing the straight line",
      "Hips in the air — easier but not a plank",
      "Holding breath — creates false intra-abdominal pressure"
    ],
    proTip: "Add movement for progression: reach one arm forward, or lift one leg. These small changes dramatically increase core demand.",
    videoId: "pSHjTRCQxIw",
    imageQuery: "plank exercise core stability bodyweight"
  },
  "Dead Bug": {
    muscles: { primary: ["Transverse Abdominis", "Rectus Abdominis"], secondary: ["Hip Flexors"] },
    category: "Full",
    equipment: ["Bodyweight"],
    difficulty: "Beginner",
    description: "A physical therapist favorite. The dead bug trains anti-extension stability while moving the limbs — mimicking real-world demands better than the plank.",
    formCues: [
      "Lie on back, arms straight up, knees bent 90° in the air",
      "Press lower back INTO the floor — maintain this throughout",
      "Slowly lower opposite arm and leg toward the floor",
      "Return to center, then repeat on the other side",
      "Breathe out as you lower the limbs"
    ],
    commonMistakes: [
      "Back arching off the floor — losing core engagement",
      "Moving too fast — momentum replaces stability",
      "Holding breath"
    ],
    proTip: "If your lower back lifts off the floor at all, reduce range of motion. Full range is irrelevant — core stability is the goal.",
    videoId: "g_BYB0R-4Ws",
    imageQuery: "dead bug core exercise stability floor"
  },

  "Ab Wheel Rollout": {
    muscles: { primary: ["Rectus Abdominis", "Transverse Abdominis"], secondary: ["Obliques", "Latissimus Dorsi", "Triceps Brachii"] },
    category: "Full",
    equipment: ["Ab Wheel"],
    difficulty: "Advanced",
    description: "The single most demanding anti-extension core exercise. Requires the core to resist extreme spinal extension under load — EMG studies show it activates the rectus abdominis more than any other exercise.",
    formCues: [
      "Start kneeling, wheel directly below shoulders",
      "Brace core maximally before rolling out",
      "Roll wheel forward, keeping hips low — don't let lower back arch",
      "Go as far out as you can while maintaining a neutral spine",
      "Pull back by contracting the abs and lats together"
    ],
    commonMistakes: [
      "Hips piking up — the movement should be in a straight line",
      "Lower back sagging (hyper-extending) — core not braced enough",
      "Going too far too soon — build range of motion progressively"
    ],
    proTip: "Start with half rollouts to a wall, gradually increasing distance. A full rollout to the floor is a serious achievement that takes months to build.",
    videoId: "gxFrXj0sLr0",
    imageQuery: "ab wheel rollout core exercise"
  },
  "Hanging Leg Raise": {
    muscles: { primary: ["Rectus Abdominis", "Hip Flexors"], secondary: ["Obliques", "Transverse Abdominis"] },
    category: "Full",
    equipment: ["Pull-up Bar"],
    difficulty: "Intermediate",
    description: "One of the most effective lower ab exercises. Hanging creates spinal decompression and requires core strength to control the legs through a full range of motion without swinging.",
    formCues: [
      "Hang from bar with full grip, shoulders packed down",
      "Keep legs straight (or bent for easier version)",
      "Raise legs by tilting the pelvis — not just lifting from hip flexors",
      "Go as high as possible — ideally toes to bar",
      "Lower slowly — no swinging or using momentum"
    ],
    commonMistakes: [
      "Swinging the body — momentum removes ab work",
      "Only using hip flexors — consciously tilt the pelvis backward",
      "Dropping legs fast — the eccentric is where the work is"
    ],
    proTip: "Think 'curl the pelvis' rather than 'lift the legs.' This mental cue shifts the work from hip flexors to the lower rectus abdominis.",
    videoId: "hdng3ivSeVA",
    imageQuery: "hanging leg raise core abs exercise pull-up bar"
  },
  "Russian Twist": {
    muscles: { primary: ["Obliques"], secondary: ["Rectus Abdominis", "Transverse Abdominis"] },
    category: "Full",
    equipment: ["Bodyweight","Weight Plate","Medicine Ball"],
    difficulty: "Beginner",
    description: "A rotational core exercise that targets the obliques through their primary function — spinal rotation. Adding weight (plate, medicine ball) significantly increases the challenge.",
    formCues: [
      "Sit with knees bent, feet slightly off the floor, lean back 45°",
      "Hands together or holding a weight plate at chest",
      "Rotate torso side to side — not just hands",
      "Keep lower back from rounding — maintain that lean angle",
      "Touch weight to floor on each side"
    ],
    commonMistakes: [
      "Moving only the arms — torso must rotate",
      "Excessive forward lean — takes tension off obliques",
      "Going too fast — slow rotation builds more tension"
    ],
    proTip: "Feet on the floor is fine. Feet elevated is harder, but also harder to keep form — prioritise rotation quality over the leg position.",
    videoId: "wkD8rjkodUI",
    imageQuery: "russian twist obliques core exercise"
  },
  "Cable Crunch": {
    muscles: { primary: ["Rectus Abdominis"], secondary: ["Obliques"] },
    category: "Full",
    equipment: ["Cable Machine"],
    difficulty: "Beginner",
    description: "The only crunch variation with true progressive overload — you can keep adding weight as you get stronger. Cables provide constant tension throughout the movement, unlike floor crunches.",
    formCues: [
      "Kneel in front of a high cable, rope attachment, hands at forehead",
      "Hinge at the hips, pulling the rib cage toward the pelvis",
      "This is a crunch, not a hip hinge — the movement is in the spine",
      "Round the lower back at the bottom — full spinal flexion",
      "Return to start slowly — feel the abs lengthening"
    ],
    commonMistakes: [
      "Hip-hinging instead of spinal flexion — lats do the work instead of abs",
      "Arms pulling the head down — hands stay at forehead",
      "Standing up too tall on the return"
    ],
    proTip: "The distinction between hip-hinge and spinal flexion is everything. Keep your hips stationary and think about 'crunching your ribs to your pelvis.'",
    videoId: "AV5PEeq_LBQ",
    imageQuery: "cable crunch kneeling abs core exercise"
  },

  "Ab Crunch Machine": {
    muscles: { primary: ["Rectus Abdominis"], secondary: ["Obliques"] },
    category: "Full",
    equipment: ["Machine"],
    difficulty: "Beginner",
    description: "A guided machine crunch that isolates the abs with adjustable resistance. Great for beginners learning the crunch pattern and for anyone wanting direct ab work with progressive overload without needing cable setup.",
    formCues: [
      "Adjust the pad so it sits across your upper chest/shoulders",
      "Plant feet flat on the footrest — don't use your legs to pull",
      "Hinge at the waist, crunching your ribs toward your pelvis",
      "Pause and squeeze the abs hard at the bottom",
      "Return slowly — resist the weight on the way up"
    ],
    commonMistakes: [
      "Using momentum — letting the weight bounce at the bottom",
      "Pushing with the legs instead of pulling with the abs",
      "Not achieving full range of motion — shortchanging the contraction",
      "Going too heavy and losing the mind-muscle connection"
    ],
    proTip: "Slow the eccentric (return) down to 3 seconds. The abs work just as hard — if not harder — fighting the resistance on the way back up.",
    videoId: "XinELJCfnd0",
    imageQuery: "ab crunch machine gym core exercise"
  },

  // ── CARDIO ───────────────────────────────────────────────────────────────
  "Running": {
    muscles: { primary: ["Quadriceps", "Hamstrings", "Calves", "Glutes"], secondary: ["Core", "Hip Flexors"] },
    category: "Cardio",
    equipment: ["None"],
    difficulty: "Beginner",
    description: "The most natural form of human cardio. Running builds cardiovascular endurance, burns calories, and strengthens lower body. Zone 2 training (conversational pace) builds aerobic base.",
    formCues: [
      "Land with foot under your center of mass — not in front",
      "Slight forward lean from the ankles, not the waist",
      "Arms swing front-to-back (not crossing body), elbows ~90°",
      "Relax shoulders — tension wastes energy",
      "Cadence of ~170–180 steps/min reduces injury risk"
    ],
    commonMistakes: [
      "Heel striking with foot far in front — braking force, knee stress",
      "Overstriding — each step should be short and quick",
      "Tensing shoulders and arms"
    ],
    proTip: "80% of your runs should be at Zone 2 (you can hold a conversation). Reserve 20% for harder efforts. This builds aerobic capacity without overtraining.",
    videoId: "brFHyOtTwH4",
    imageQuery: "running outdoor cardio exercise jogging form"
  },
  "Rowing Machine": {
    muscles: { primary: ["Latissimus Dorsi", "Rhomboids", "Legs"], secondary: ["Biceps", "Core", "Shoulders"] },
    category: "Cardio",
    equipment: ["Rowing Ergometer"],
    difficulty: "Beginner",
    description: "One of the best full-body cardio machines. 60% legs, 20% core, 20% arms. The rowing stroke is a full-body movement that builds cardiovascular fitness AND back strength simultaneously.",
    formCues: [
      "SEQUENCE: Legs → Back → Arms on the drive",
      "SEQUENCE (recovery): Arms → Back → Legs",
      "At the catch: shins vertical, arms straight, slight lean forward",
      "Drive legs first — power comes from the legs, not the arms",
      "Lean back slightly (~11 o'clock) at the finish"
    ],
    commonMistakes: [
      "Using arms first — wrong sequence, very common",
      "Over-reaching at the catch — strains lower back",
      "Hunching the back — keep chest tall"
    ],
    proTip: "Think of the ratio as 60/20/20 — 60% of your power should come from leg drive. If your legs are tired, you're rowing correctly.",
    videoId: "GddpBkwDpGg",
    imageQuery: "rowing machine cardio exercise full body"
  },
  "Jump Rope": {
    muscles: { primary: ["Calves", "Shoulders", "Core"], secondary: ["Cardiovascular System"] },
    category: "Cardio",
    equipment: ["Jump Rope"],
    difficulty: "Beginner",
    description: "An elite-level conditioning tool. Jump rope develops coordination, calf strength, and cardiovascular capacity. 10 minutes of jump rope is roughly equivalent to 30 minutes of jogging.",
    formCues: [
      "Land softly on the balls of your feet — not flat-footed",
      "Keep elbows close to body, wrists do the rotation",
      "Jump 1–2 inches off the ground — minimal air time needed",
      "Stay relaxed — tension wastes energy"
    ],
    commonMistakes: [
      "Jumping too high — inefficient, leads to fatigue",
      "Using arms to swing the rope — wrists should do it",
      "Landing hard on heels — calf and joint stress"
    ],
    proTip: "Start with alternating feet (like jogging in place) rather than double-foot jumping. It's easier to maintain rhythm.",
    videoId: "FJmRQ5iTXKE",
    imageQuery: "jump rope cardio exercise conditioning"
  },
  "Cycling": {
    muscles: { primary: ["Quadriceps", "Glutes", "Hamstrings"], secondary: ["Calves", "Core", "Hip Flexors"] },
    category: "Cardio",
    equipment: ["Bike","Stationary Bike"],
    difficulty: "Beginner",
    description: "Low-impact cardiovascular exercise that's easy on the joints while building serious lower body endurance. Stationary bikes allow precise resistance and cadence control.",
    formCues: [
      "Seat height: knee should have a slight bend at the bottom of the pedal stroke",
      "Pedal with the ball of the foot — not the heel",
      "Keep cadence between 80–100 RPM for aerobic work",
      "Core braced, slight forward lean from the hips",
      "Hands light on the bars — don't lock out elbows"
    ],
    commonMistakes: [
      "Seat too low — knees over-flex, causes knee pain",
      "Mashing big gears at low cadence — hard on knees",
      "Hunching the upper back"
    ],
    proTip: "For fat loss and aerobic base, keep cadence high (90–100 RPM) at moderate resistance. High cadence training is easier on joints than grinding low cadence.",
    videoId: "m6sAGWWGECk",
    imageQuery: "cycling stationary bike cardio exercise"
  },
  "Stair Climber": {
    muscles: { primary: ["Glutes", "Quadriceps", "Hamstrings"], secondary: ["Calves", "Core"] },
    category: "Cardio",
    equipment: ["Stair Machine"],
    difficulty: "Beginner",
    description: "One of the most effective cardio machines for glute development. The step pattern mimics climbing stairs and activates the glutes significantly more than flat walking or running.",
    formCues: [
      "Stand tall — don't lean on the handrails for support",
      "Take full steps — don't just tap the top of each step",
      "Keep weight on your full foot, push through the heel",
      "Slight forward lean is natural — but don't hunch",
      "Arms swing naturally, or hold rails lightly for balance only"
    ],
    commonMistakes: [
      "Leaning heavily on handrails — reduces caloric burn and glute activation by up to 25%",
      "Half-steps at very high speed — full steps at moderate pace is better",
      "Hunched forward posture"
    ],
    proTip: "Try skipping every other step — this increases glute activation and range of motion per step significantly.",
    videoId: "wFYvKhJtT4Y",
    imageQuery: "stair climber cardio machine glutes exercise"
  },
  "Battle Ropes": {
    muscles: { primary: ["Shoulders", "Core"], secondary: ["Biceps Brachii", "Triceps Brachii", "Latissimus Dorsi"] },
    category: "Cardio",
    equipment: ["Battle Ropes"],
    difficulty: "Beginner",
    description: "A high-intensity conditioning tool that simultaneously builds cardiovascular fitness and upper body muscular endurance. Alternating waves, slams, and circles each challenge different muscle patterns.",
    formCues: [
      "Stand with feet shoulder-width, slight squat position",
      "Hold one rope end in each hand",
      "Alternate waves: one arm up while other goes down, rapid rhythm",
      "Keep core braced — don't let lower back round",
      "Drive movement from shoulders, not just wrists"
    ],
    commonMistakes: [
      "Standing too far from the anchor — ropes too slack",
      "Only moving the wrists — full shoulder involvement needed",
      "Neglecting the lower body — add a squat pattern for full-body burn"
    ],
    proTip: "Perform intervals: 20–30 seconds of max effort waves, 30–40 seconds rest. This mimics HIIT and maximizes cardiovascular and metabolic demand.",
    videoId: "EHWp4PYBvzs",
    imageQuery: "battle ropes cardio exercise fitness conditioning"
  },
  "Burpees": {
    muscles: { primary: ["Quadriceps", "Glutes", "Pectoralis Major"], secondary: ["Core", "Triceps Brachii", "Shoulders", "Hamstrings"] },
    category: "Cardio",
    equipment: ["Bodyweight"],
    difficulty: "Intermediate",
    description: "The most metabolically demanding bodyweight exercise. A burpee combines a squat, push-up, and jump into one continuous movement — taxing virtually every muscle in the body while spiking heart rate rapidly.",
    formCues: [
      "Stand tall, then squat and place hands on floor",
      "Jump or step feet back into push-up position",
      "Perform a full push-up (chest to floor)",
      "Jump feet back to hands",
      "Explosively jump up, arms overhead — land softly"
    ],
    commonMistakes: [
      "Skipping the push-up — reduces upper body involvement",
      "Landing with stiff knees — cushion every landing",
      "Letting lower back sag in the push-up position"
    ],
    proTip: "Modify by stepping instead of jumping feet, and removing the jump at the top. This reduces joint impact while keeping the metabolic demand high.",
    videoId: "qLBImHhCXSw",
    imageQuery: "burpees bodyweight cardio exercise full body"
  },
  "Box Jumps": {
    muscles: { primary: ["Quadriceps", "Glutes", "Hamstrings"], secondary: ["Calves", "Core"] },
    category: "Cardio",
    equipment: ["Plyo Box"],
    difficulty: "Intermediate",
    description: "A plyometric exercise that trains explosive power, fast-twitch muscle fibres, and landing mechanics. Box jumps build athletic ability and burn significant calories due to their explosive nature.",
    formCues: [
      "Stand arm's length from a box that's knee to mid-thigh height",
      "Swing arms back, then forward as you drive off both feet",
      "Land softly on the box in a mini-squat position — absorb the impact",
      "Stand fully upright on the box, then step down (don't jump down)",
      "Reset fully before the next rep"
    ],
    commonMistakes: [
      "Jumping down from the box — Achilles tendon injury risk",
      "Landing with straight knees — very hard on joints",
      "Box too high too soon — build height progressively"
    ],
    proTip: "Step down, never jump down. The landing from jumping down puts 3–5x bodyweight force through the Achilles — a common injury mechanism.",
    videoId: "NBY9-kTuHEk",
    imageQuery: "box jump plyometric exercise cardio power"
  }
};

// Workout tips grouped by category
export const WORKOUT_TIPS = {
  progressive_overload: {
    title: "Progressive Overload",
    icon: "📈",
    tip: "Add ~2.5–5% more weight or 1–2 more reps each week. This is the #1 driver of muscle growth. Without it, your body adapts and stops improving."
  },
  recovery: {
    title: "Recovery",
    icon: "😴",
    tip: "Muscles grow during rest, not during workouts. Allow 48 hours before training the same muscle group again. Aim for 7–9 hours of sleep — this is when growth hormone peaks."
  },
  protein: {
    title: "Protein Intake",
    icon: "🥩",
    tip: "Aim for 1.6–2.2g of protein per kg of bodyweight per day. Spread intake across 3–5 meals. Muscle protein synthesis is maximized at ~0.4g/kg per meal."
  },
  form: {
    title: "Form First",
    icon: "🎯",
    tip: "Perfect form with lighter weight beats sloppy form with heavy weight. Film yourself from the side. Poor form is a slow injury waiting to happen — and it limits how much muscle you actually build."
  },
  warmup: {
    title: "Warm Up",
    icon: "🔥",
    tip: "Spend 5–10 minutes on dynamic warm-up before lifting. Do 2–3 warm-up sets with the empty bar for compound movements. Cold muscles tear, warm muscles perform."
  },
  consistency: {
    title: "Consistency Wins",
    icon: "📅",
    tip: "3–4 sessions per week, done consistently over years, beats 6 days/week done for a month then quitting. The best program is the one you'll actually stick to."
  }
};

// Scientific → common name mapping for muscle display
export const COMMON_NAMES = {
  'Pectoralis Major':        'Chest',
  'Upper Pectoralis Major':  'Upper Chest',
  'Lower Pectoralis Major':  'Lower Chest',
  'Pectoralis Minor':        'Inner Chest',
  'Anterior Deltoid':        'Front Delt',
  'Medial Deltoid':          'Side Delt',
  'Posterior Deltoid':       'Rear Delt',
  'Rear Deltoid':            'Rear Delt',
  'Rotator Cuff':            'Rotator Cuff',
  'Supraspinatus':           'Rotator Cuff',
  'Triceps Brachii':         'Triceps',
  'Biceps Brachii':          'Biceps',
  'Brachialis':              'Inner Bicep',
  'Brachioradialis':         'Outer Forearm',
  'Latissimus Dorsi':        'Lats',
  'Rhomboids':               'Mid Back',
  'Trapezius':               'Traps',
  'Middle Trapezius':        'Mid Traps',
  'Erector Spinae':          'Lower Back',
  'Rectus Abdominis':        'Abs',
  'Transverse Abdominis':    'Deep Core',
  'Obliques':                'Obliques',
  'Quadriceps':              'Quads',
  'Hamstrings':              'Hamstrings',
  'Gluteus Maximus':         'Glutes',
  'Adductors':               'Inner Thigh',
  'Gastrocnemius':           'Calves (Outer)',
  'Soleus':                  'Calves (Inner)',
  'Hip Flexors':             'Hip Flexors',
  'Cardiovascular System':   'Heart & Lungs',
}

// Common exercise suggestions by workout type
export const EXERCISE_SUGGESTIONS = {
  Push: ["Bench Press", "Incline Dumbbell Press", "Overhead Press", "Lateral Raises", "Tricep Dips", "Push-ups", "Dips", "Cable Chest Fly", "Skull Crushers", "Tricep Pushdown", "Arnold Press", "Close-Grip Bench Press"],
  Pull: ["Pull-ups", "Chin-ups", "Barbell Row", "Deadlift", "Romanian Deadlift", "Cable Row", "Face Pull", "Bicep Curl", "Lat Pulldown", "Single-Arm Dumbbell Row", "Hammer Curl", "Concentration Curl", "Cable Wrist Curl"],
  Legs: ["Squat", "Leg Press", "Romanian Deadlift", "Lunges", "Leg Extension", "Hip Thrust", "Calf Raise", "Bulgarian Split Squat", "Goblet Squat", "Hack Squat", "Leg Curl", "Step-ups", "Seated Calf Raise"],
  Full: ["Deadlift", "Squat", "Plank", "Dead Bug", "Barbell Row", "Overhead Press", "Ab Wheel Rollout", "Hanging Leg Raise", "Cable Crunch", "Ab Crunch Machine", "Russian Twist", "Burpees"],
  Cardio: ["Running", "Rowing Machine", "Jump Rope", "Cycling", "Stair Climber", "Battle Ropes", "Burpees", "Box Jumps"],
  Rest: []
};

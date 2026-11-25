/* Field calls. Fictional service calls built from research/ninefold-profile.md section 7.
   Written to "you" on purpose. No real customers. */
window.NF = window.NF || {};
NF.calls = [
  { id: 'swarmers', title: 'Tan swarmers at dusk', area: 'Chesapeake', stop: 'Residential termite',
    takeaway: 'Samples before guesses. Tan swarmers at dusk in the Hampton Roads area get a closer look.',
    steps: [
      { phase: 'Inspect', ask: 'A customer sends a video of tan winged insects at dusk in June. What comes first?', opts: ['Book a Termidor HE treatment', 'Get samples and identify them', 'Tell them it is probably ants', 'Spray the windowsill'], ans: 1, why: 'Identify first. A video can\'t tell you waist, wings and antennae.' },
      { phase: 'Inspect', ask: 'Under a loupe: broad waist, equal wings, straight antennae. What is it?', opts: ['Ant swarmer', 'Termite swarmer', 'Carpenter bee', 'Powderpost beetle'], ans: 1, why: 'Broad, Equal, Straight is a termite. The tan color and dusk flight also make you think about Formosans.' },
      { phase: 'Protect', ask: 'You find soldiers with teardrop-shaped heads. Next step?', opts: ['Nothing different', 'Send a sample through Extension and tell your manager', 'Treat the attic with a dust', 'Throw the sample away'], ans: 1, why: 'A teardrop head points to Formosan. Formosans were reported in Norfolk in 2022. Suspect samples go to Extension.' },
      { phase: 'Prove', ask: 'What do you tell the customer?', opts: ['"These are definitely Formosan."', '"Here is what I saw, what I sent for ID, and what happens next."', '"Nothing to worry about."', '"Our treatment is completely safe."'], ans: 1, why: 'Plain language, no scare tactics, no guessing. And don\'t say "safe". Say you follow the label.' }
    ] },
  { id: 'hose', state: 'va', title: 'Split hose in the driveway', area: 'Chesapeake', stop: 'Spill',
    takeaway: 'Control, Contain, Clean up, Call. Forty-eight to phone, ten to write.',
    steps: [
      { phase: 'Inspect', ask: 'A hose splits. Dilution runs toward a storm drain. What is first?', opts: ['Call the office', 'Protect yourself and shut off the pump', 'Hose it down the drain', 'Move the truck'], ans: 1, why: 'Protect yourself, then control the source.' },
      { phase: 'Protect', ask: 'The pump is off. What now?', opts: ['Wash the driveway', 'Dike it with absorbent, keep it out of the drain', 'Wait for it to dry', 'Spray water to dilute it'], ans: 1, why: 'Contain. Water only spreads it.' },
      { phase: 'Protect', ask: 'Where does the used absorbent go?', opts: ['Customer\'s trash', 'Storm drain', 'A sealed, labeled container for proper disposal', 'Lawn'], ans: 2, why: 'Clean up into containers for disposal per the label and your supervisor.' },
      { phase: 'Prove', ask: 'Some reached the drain. It is a general-use product. Is it reportable?', opts: ['No, only restricted-use', 'Yes. Phone within 48 hours, written report within 10 working days', 'Only if someone was hurt', 'Only over 5 gallons'], ans: 1, why: 'A threat to the environment triggers reporting, restricted-use or not.' }
    ] },
  { id: 'crawl', title: 'August crawl space', area: 'Chesapeake', stop: 'Crawl space',
    takeaway: 'Heat and pesticide exposure look alike. Stop, get out, get help, bring the label.',
    steps: [
      { phase: 'Inspect', ask: 'Before you go in with Termidor HE, which gear does the label add for a crawl space?', opts: ['Nothing extra', 'Particulate respirator and eyewear', 'A rubber apron', 'Chemical boots only'], ans: 1, why: 'The label adds a particulate respirator as listed and protective eyewear in non-ventilated spaces like crawls.' },
      { phase: 'Protect', ask: 'Twenty minutes in you feel dizzy with a headache. What do you do?', opts: ['Finish the wall', 'Drink water and keep going', 'Stop, get out, start first aid, get medical care', 'Take off your respirator and stay'], ans: 2, why: 'You can\'t tell heat from exposure in the moment. Treat it as serious.' },
      { phase: 'Prove', ask: 'You go to urgent care. What do you bring?', opts: ['The label', 'The invoice', 'Your phone only', 'The sprayer'], ans: 0, why: 'Bring the label. It has first aid and a note to physician.' }
    ] },
  { id: 'dawn', title: 'Calm, foggy dawn', area: 'Roanoke', stop: 'Exterior',
    takeaway: 'Dead calm with fog in the low spots can mean an inversion. Calm is not automatically safe.',
    steps: [
      { phase: 'Inspect', ask: 'No wind, fog in the valley, smoke drifting sideways. What might this be?', opts: ['Perfect spray weather', 'A temperature inversion', 'Volatilization', 'Leaching'], ans: 1, why: 'Cool air trapped under warm air. Fine droplets can hang and move sideways.' },
      { phase: 'Protect', ask: 'Your exterior spray is next. What do you do?', opts: ['Spray now, while it is calm', 'Raise the pressure', 'Wait for conditions to improve', 'Use a finer nozzle'], ans: 2, why: 'Hold until the air mixes. Finer droplets and more pressure make drift worse.' },
      { phase: 'Prove', ask: 'With no wind direction on the label, what is a common guide?', opts: ['0 to 1 mph', '3 to 8 mph, away from sensitive areas', '10 to 15 mph', 'Any wind is fine'], ans: 1, why: 'At least 3 and no more than 8 mph, blowing away from anything sensitive. The label comes first.' }
    ] },
  { id: 'supervision', state: 'va', title: 'Day 10 on the job', area: 'Richmond', stop: 'Residential',
    takeaway: 'On-site means on the property, in constant visual contact.',
    steps: [
      { phase: 'Inspect', ask: 'A new hire on day 10 has no RT certificate yet. The certified applicator is at another job down the road. Can the new hire spray?', opts: ['Yes, a phone is close enough', 'No. It takes direct on-site supervision', 'Yes, for general-use products', 'Yes, with a manager\'s text'], ans: 1, why: 'Uncertified trainees need the certified applicator on the property, in constant visual contact.' },
      { phase: 'Protect', ask: 'The same person passes the RT exam. Now, which is true?', opts: ['Can use any product alone', 'General-use unsupervised, restricted-use under direct supervision', 'Can\'t apply anything alone', 'Can supervise trainees'], ans: 1, why: 'RTs apply general-use products unsupervised. Restricted-use needs direct supervision.' },
      { phase: 'Prove', ask: 'What number goes on the record for this RT\'s application?', opts: ['Business license only', 'Certification number of the applicator, or of the supervising certified applicator', 'EPA Est. No.', 'Truck number'], ans: 1, why: 'That is the wording of 2VAC5-680-65.' }
    ] },
  { id: 'video', state: 'va', title: 'The video went out', area: 'Roanoke', stop: 'Recordkeeping',
    takeaway: 'The Apruv recap is for the customer. The service record is for the law. You need both.',
    steps: [
      { phase: 'Inspect', ask: 'The customer got your Apruv recap video. The service record in FieldRoutes has no diluent amount. Is the video enough?', opts: ['Yes, it shows the work', 'No. Concentrate and diluent amounts are required on the record', 'Only for restricted-use', 'Yes, if kept 2 years'], ans: 1, why: 'Virginia requires specific fields. A video doesn\'t replace them.' },
      { phase: 'Protect', ask: 'How is the product named on the record?', opts: ['Any common name', 'As on the label', 'By active ingredient only', 'By group number'], ans: 1, why: 'The regulation says brand, trademark or product name as on the label.' },
      { phase: 'Prove', ask: 'How long is the record kept?', opts: ['6 months', '1 year', '2 years', '5 years'], ans: 2, why: 'Two years, for general use and restricted use alike.' }
    ] },
  { id: 'moisture', title: 'Wet joists, dripping trap', area: 'Richmond', stop: 'Crawl space',
    takeaway: 'Fix the source first. Then vapor barrier. Keep the conversation plain.',
    steps: [
      { phase: 'Inspect', ask: 'Joists read 22%. Bare soil and a dripping trap. How does 22% land?', opts: ['Bone dry', 'Above the 20% safety margin', 'Decay is certain', 'Under the 15% line'], ans: 1, why: '20% is the safety margin. 20 to 30% is a gray area, not a guaranteed rot number.' },
      { phase: 'Protect', ask: 'What is the first fix?', opts: ['Treat the joists', 'Fix the leak', 'Add insulation', 'Paint the joists'], ans: 1, why: 'Source first. Nothing else holds until the water stops.' },
      { phase: 'Prove', ask: 'The customer asks if they have termites. You saw no evidence. What do you say?', opts: ['"Probably."', '"No termites ever."', '"No visible evidence today. Here is the moisture issue and how to fix it."', '"The house is safe."'], ans: 2, why: 'See it, say it. Don\'t guess it. Findings are visible evidence on that date.' }
    ] },
  { id: 'jug', state: 'va', title: 'Spiders on a termite job', area: 'Richmond', stop: 'Residential',
    takeaway: 'Read the label in your hand. Termidor HE is for termites, not general pest work.',
    steps: [
      { phase: 'Inspect', ask: 'A customer asks you to hit spiders while you are there. You have Termidor HE on the truck. Can you use it?', opts: ['Yes, it kills insects', 'No. The label says not for general pest control', 'Yes, at half rate', 'Yes, outside only'], ans: 1, why: 'It\'s a termiticide label. Using it elsewhere is a violation.' },
      { phase: 'Protect', ask: 'The bottle in the truck has a torn label. What do you need for the record, and where do you get it?', opts: ['Guess from memory', 'The EPA Reg. No., from a label copy from EPA or the manufacturer', 'Use the Est. No.', 'Leave it blank'], ans: 1, why: 'Don\'t guess. Get the real label. And don\'t work from a torn one.' },
      { phase: 'Prove', ask: 'A jug of concentrate gets poured into a smaller bottle. What must that bottle show in Virginia?', opts: ['Nothing', 'Product name, EPA Reg. No., active names and percent, signal word', 'Only your initials', 'Only the date'], ans: 1, why: 'Concentrate in a service container has no size exemption.' }
    ] },
  { id: 'rainday', title: 'Rain on the route', area: 'Richmond', stop: 'Quarterly service',
    takeaway: 'We do not default to skipping. Spray what is dry, use granules for support, push interior, and the label still comes first.',
    steps: [
      { phase: 'Inspect', ask: 'Steady rain at your next quarterly stop. What do you do first?', opts: ['Mark a no-show', 'Walk it. See what is dry, what is saturated, and what is still treatable', 'Spray the whole foundation as usual', 'Drive home'], ans: 1, why: 'The weather assessment is part of the pre-inspection walk. Severe weather? Call your manager before any no-show.' },
      { phase: 'Protect', ask: 'The back wall is under an overhang. The front is soaked. How do you treat?', opts: ['Spray both the same', 'Spray the dry back wall, granular band around the rest', 'Skip both', 'Double the rate in front'], ans: 1, why: 'Avoid saturated surfaces where product will not adhere. Granules support the service and do not replace it.' },
      { phase: 'Protect', ask: 'The customer is home. What should you offer?', opts: ['Nothing extra', 'Interior treatment', 'A discount', 'A fog of the yard'], ans: 1, why: 'Interior matters more when the exterior is limited. Baseboards, entry points, problem areas.' },
      { phase: 'Prove', ask: 'A mosquito stop is next, same rain. What do you do?', opts: ['Fog, then reschedule', 'Refill or install In2Care and do not fog', 'Fog at a higher rate', 'Skip it and say nothing'], ans: 1, why: 'Do not fog in the rain. Tell the customer it was skipped on purpose. Fogging is not rescheduled.' }
    ] },
  { id: 'antsback', title: 'Ants are back', area: 'Chesapeake', stop: 'Target treatment',
    takeaway: 'Find the source. Dense, non-repellent treatment, keep liquid off bait, and set a 2-week expectation.',
    steps: [
      { phase: 'Inspect', ask: 'It is a reservice for ants, and the last tech was someone else. How do you start?', opts: ['Explain it wasn\'t your service', 'Listen, then do a full walkaround', 'Spray the kitchen right away', 'Offer a refund'], ans: 1, why: 'No defensiveness, even if the last service wasn\'t yours. Own the outcome.' },
      { phase: 'Inspect', ask: 'What is the most important part of the ant treatment?', opts: ['Spraying fast', 'Following trails to find nests and satellites', 'Using the most product', 'Treating every room'], ans: 1, why: 'Trails lead you to nesting sites you can treat on the spot.' },
      { phase: 'Protect', ask: 'You find a heavy infestation. What is the Optiguard Flex mix?', opts: ['0.27 fl oz per gallon', '0.54 fl oz per gallon, per label', '2 fl oz per gallon', 'Whatever fits the tank'], ans: 1, why: 'Standard is 0.27. Heavy infestations can go to 0.54. Follow the label.' },
      { phase: 'Protect', ask: 'There is a flowering shrub by the foundation. Can you apply at its base?', opts: ['Yes, it is systemic', 'No. Non-flowering plants only', 'Yes, at half rate', 'Only at dusk'], ans: 1, why: 'The SOP says NON-flowering plants. Honeydew feeding helps on those, and flowers bring bees.' },
      { phase: 'Prove', ask: 'What do you tell the customer?', opts: ['"They\'ll be gone tonight."', '"More ants for a few days is normal. Expect a drop in 7 to 10 days. Call if it lasts past 2 weeks."', '"Spray anything you see."', '"Clean around the bait daily."'], ans: 1, why: 'Set the timeline. No sprays or cleaning near bait.' }
    ] },
  { id: 'apartment', title: 'Roaches in the apartment', area: 'Roanoke', stop: 'German roach',
    takeaway: 'Bait and residual stay apart, appliances stay put, and offer the subscription when it is heavy.',
    steps: [
      { phase: 'Inspect', ask: 'The best harborage looks to be behind the fridge. What do you do?', opts: ['Pull it out yourself', 'Have the customer move it', 'Skip that area', 'Spray under it from the front'], ans: 1, why: 'Never move appliances.' },
      { phase: 'Protect', ask: 'Where does your residual go compared to your bait?', opts: ['Same spots', 'Never on surfaces where bait will go', 'Over the bait', 'It doesn\'t matter'], ans: 1, why: 'Contaminated bait stops working. Use a non-repellent residual in deep cracks and keep them separate.' },
      { phase: 'Protect', ask: 'How do you place gel bait?', opts: ['One big blob', 'Many small dots near harborages', 'On counters', 'On food shelves'], ans: 1, why: 'Many placements, not big blobs. Never on food surfaces.' },
      { phase: 'Prove', ask: 'Heavy activity, shared walls. German roaches aren\'t in any package. What do you offer?', opts: ['Nothing', 'The German Roach Subscription, and flag it for the office', 'A free quarterly', 'A fogger'], ans: 1, why: 'Note the interest and flag it. Multi-unit spread goes to your manager.' }
    ] },
  { id: 'soffit', title: 'Nest above the garage', area: 'Richmond', stop: 'Stinging insects',
    takeaway: 'Ground reach only. No ladders. Plan your retreat, and escalate what you can\'t reach.',
    steps: [
      { phase: 'Inspect', ask: 'What do you ask the customer before you treat?', opts: ['Their favorite product', 'Where they have seen them, and about stings or allergies', 'Nothing', 'How much they paid'], ans: 1, why: 'Allergies change how careful everyone needs to be.' },
      { phase: 'Protect', ask: 'The nest needs a ladder to reach. What do you do?', opts: ['Use the customer\'s ladder', 'Escalate to your service manager', 'Stand on the truck', 'Skip it and mark it done'], ans: 1, why: 'We do not use ladders. Only ground reach with extension tools.' },
      { phase: 'Protect', ask: 'A second nest is in a wall void. How do you treat it?', opts: ['Plug the hole', 'Dust into the void, and do not remove the nest', 'Pour liquid in', 'Pull the siding off'], ans: 1, why: 'Dust goes into voids. Nests inside walls do not get removed. Escalate if it needs drilling.' },
      { phase: 'Prove', ask: 'What do you tell the customer?', opts: ['"All gone."', '"You may see a few stragglers for 24 to 48 hours as the colony collapses."', '"Don\'t go outside for a week."', '"This product is safe."'], ans: 1, why: 'Set expectations, and give re-entry from the label.' }
    ] },
  { id: 'trench', title: 'Termite job, block garage', area: 'Chesapeake', stop: 'Termite liquid',
    takeaway: 'Read the graph, drill no wider than 18 inches, patch before you backfill, and set the 3-month expectation.',
    steps: [
      { phase: 'Inspect', ask: 'Before you drill anything, what do you review?', opts: ['The price', 'The graph, then plan where to start', 'Just the weather app', 'Nothing'], ans: 1, why: 'The graph shows which walls and which side. Also confirm room to work and animals put away.' },
      { phase: 'Protect', ask: 'How far apart do your drill holes go?', opts: ['24 inches', '12 to 18 inches', '36 inches', 'Wherever is easy'], ans: 1, why: 'At most 18 inches. Anything more makes the treatment ineffective.' },
      { phase: 'Protect', ask: 'Your drill stops by itself on the slab. Why?', opts: ['Dead battery', 'The interruptor hit metal or wiring. Move to a new spot', 'The bit is dull', 'Ignore it and restart'], ans: 1, why: 'That is exactly what the interruptor is for.' },
      { phase: 'Prove', ask: 'Treatment is done. What comes first?', opts: ['Backfill the trench', 'Patch the drill holes, so product soaks into the trench', 'Leave for the day', 'Hose it down'], ans: 1, why: 'Patch first, then backfill dirt, then rocks. Sweep up and give the 3-month expectation.' }
    ] }
];

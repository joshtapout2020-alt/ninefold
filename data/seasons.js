window.NF = window.NF || {};
NF.seasons = {
    "meta":  {
                 "title":  "Virginia seasonal training",
                 "note":  "Spring = March to May. Summer = June to August. Fall = September to November. Winter = December to February. Follow the label for every weather or temperature limit; it overrides everything here."
             },
    "regions":  {
                    "coast":  {
                                  "name":  "Coast (Tidewater, Chesapeake branch)",
                                  "facts":  "Average last frost about April 10 to 21 and first frost about November 8 to 28 (Fairfax County table). Freeze-free period is 1 to 2 months longer than the western mountains (VCE). Formosan termites reported in Norfolk in 2022. Lone star ticks very common in the Coastal Plain."
                              },
                    "piedmont":  {
                                     "name":  "Piedmont (Richmond branch)",
                                     "facts":  "Average last frost about April 20 to 30 and first frost about October 19 to 29 (Fairfax County table). Lone star ticks very common."
                                 },
                    "mountains":  {
                                      "name":  "Mountains (Roanoke branch area)",
                                      "facts":  "Coldest zones. VCE frost table: Zone 6a last frost May 5 to 15, first frost October 5 to 15; 6b April 25 to May 5, first frost October 5 to 15. Valley fog and inversions make morning drift a concern. Lone star tick found mostly east of the Blue Ridge. Lyme disease more prevalent in northern and southwestern Virginia."
                                  }
                },
    "seasons":  [
                    {
                        "key":  "spring",
                        "season":  "Spring",
                        "months":  "March to May",
                        "pestPressure":  [
                                             "Termite swarm calls: NC Extension says frequent in spring. Virginia dates unverified.",
                                             "Lady beetles: second indoor peak in late March (VT).",
                                             "Ticks active (VT).",
                                             "Carpenter bees start (VT survey: spring and summer).",
                                             "Stink bugs leave overwintering late April to mid-May (Penn State)."
                                         ],
                        "inspectionChanges":  [
                                                  "Look for wing piles and tubes on foundation walls.",
                                                  "Check winter damage to gutters and grading.",
                                                  "Check crawl spaces for moisture after thaw.",
                                                  "Check moisture in spring rains before any termite job."
                                              ],
                        "treatmentChanges":  [
                                                 "Plan around rain. Termidor labels bar treatment during precipitation or in saturated or frozen soil.",
                                                 "Watch bloom before spraying shrubs.",
                                                 "Pre-emergent weed window: Ninefold says March and April."
                                             ],
                        "weatherLabel":  {
                                             "rainRunoff":  "Plan soil jobs around rain. Do not treat saturated soil. Keep away from drains. Check forecast; EPA suggests no rain predicted for the next 24 hours for home use.",
                                             "windDrift":  "Absent label directions, 3 to 8 mph blowing away from sensitive areas. Fog in low spots may mean an inversion.",
                                             "temperature":  "Frozen soil can linger in mountains. Follow label limits.",
                                             "pollinators":  "Bloom is the main risk. \u0027Do not apply to blooming plants if bees are foraging\u0027 language governs. Neonicotinoid foliar labels carry a Pollinator Protection Box.",
                                             "coldStorage":  "Late frost in mountains into May; keep winter rules until then.",
                                             "heatPpe":  "Cool mornings are a good time for heavy PPE work. Begin acclimatizing.",
                                             "truckStorage":  "Lock boxes, no passenger compartment, secure load, spill kit on board."
                                         },
                        "customerQuestions":  [
                                                  {
                                                      "q":  "I saw flying ants. Are they termites?",
                                                      "a":  "Check waist, wings, antennae. Save a few in a bag for us."
                                                  },
                                                  {
                                                      "q":  "Can I still use my yard after you treat?",
                                                      "a":  "We\u0027ll tell you when, based on the label. Stay off until dry unless it says otherwise."
                                                  },
                                                  {
                                                      "q":  "Why are lady beetles coming out of my walls now?",
                                                      "a":  "VT says they try to get outside in late March. They\u0027ll die in a few days; vacuum them."
                                                  }
                                              ],
                        "regional":  {
                                         "coast":  "Earliest spring and earliest mosquito concern. Watch for tan swarmers in late spring and take samples.",
                                         "piedmont":  "Spring moves up the state about 10 days behind Tidewater on frost tables.",
                                         "mountains":  "Frost risk into May in the coldest zones. Slower soil warm-up. Bloom later."
                                     },
                        "quiz":  [
                                     {
                                         "id":  "season-spring-1",
                                         "module":  "seasonal",
                                         "difficulty":  1,
                                         "question":  "Rain starts during a termite job. What does the Termidor label say?",
                                         "choices":  [
                                                         "Do not treat during precipitation",
                                                         "Treat faster",
                                                         "Use more water so the soil takes it up",
                                                         "Use less concentrate to limit runoff"
                                                     ],
                                         "answer":  0,
                                         "explanation":  "Labels say do not make treatments while precipitation is occurring.",
                                         "whyNot":  [
                                                        null,
                                                        "Speed does not make it legal.",
                                                        "More water does not make it legal.",
                                                        "Less concentrate breaks the label."
                                                    ],
                                         "source":  "Termidor HE label"
                                     },
                                     {
                                         "id":  "season-spring-2",
                                         "module":  "seasonal",
                                         "difficulty":  2,
                                         "question":  "Which spring concern applies most when spraying shrubs?",
                                         "choices":  [
                                                         "Customers away on spring break trips",
                                                         "Frozen pipes",
                                                         "Plants in bloom with bees foraging",
                                                         "Attics that heat up in the afternoon"
                                                     ],
                                         "answer":  2,
                                         "explanation":  "Read the label\u0027s bee language.",
                                         "whyNot":  [
                                                        "Travel is not a spray concern.",
                                                        "Frozen pipes are not a spraying concern.",
                                                        null,
                                                        "Attic heat does not affect shrub spraying."
                                                    ],
                                         "source":  "Pesticide Environmental Stewardship"
                                     },
                                     {
                                         "id":  "season-spring-3",
                                         "module":  "seasonal",
                                         "difficulty":  2,
                                         "question":  "Why check crawl spaces after late winter rains?",
                                         "choices":  [
                                                         "Labels require painted joists",
                                                         "Moisture supports termites, fungi, and beetles",
                                                         "Mice leave crawls in spring",
                                                         "Crawl spaces get too dry"
                                                     ],
                                         "answer":  1,
                                         "explanation":  "Moisture links many WDO problems.",
                                         "whyNot":  [
                                                        "No label requires painting joists.",
                                                        null,
                                                        "Mice are not the reason.",
                                                        "Rains add moisture."
                                                    ],
                                         "source":  "NCSU; Ninefold moisture page"
                                     },
                                     {
                                         "id":  "season-spring-4",
                                         "module":  "seasonal",
                                         "difficulty":  2,
                                         "question":  "Why do lady beetles show up inside in late March?",
                                         "choices":  [
                                                         "They are breeding in the kitchen and pantry",
                                                         "They are eating wood",
                                                         "They just arrived to spend the winter inside",
                                                         "They are trying to find their way outside"
                                                     ],
                                         "answer":  3,
                                         "explanation":  "VT gives a second peak in late March as they move to get out.",
                                         "whyNot":  [
                                                        "They do not breed indoors.",
                                                        "They do not eat wood.",
                                                        "They came in during fall.",
                                                        null
                                                    ],
                                         "source":  "VT 444-275"
                                     }
                                 ]
                    },
                    {
                        "key":  "summer",
                        "season":  "Summer",
                        "months":  "June to August",
                        "pestPressure":  [
                                             "Ticks peak (VT: ehrlichiosis and Lyme reporting in summer).",
                                             "Asian tiger mosquito (local sources: nuisance from about June).",
                                             "Yellowjackets build to a late-summer peak (VT).",
                                             "Powderpost beetle emergence, May to August (NC)."
                                         ],
                        "inspectionChanges":  [
                                                  "Look for container breeding sites.",
                                                  "Check eaves and soffits before ladder work.",
                                                  "Ground-nest checks before crawl access.",
                                                  "Watch for wasps in crawl vents."
                                              ],
                        "treatmentChanges":  [
                                                 "Move heavy PPE work to cooler hours.",
                                                 "Shift crawl jobs early.",
                                                 "Treat wasp nests at night per VT.",
                                                 "Mix only what\u0027s needed; do not leave a tank in the sun."
                                             ],
                        "weatherLabel":  {
                                             "rainRunoff":  "Afternoon storms: check before soil or exterior work. Keep sprays off hard surfaces and away from storm drains.",
                                             "windDrift":  "Hot, dry air shrinks droplets. Use larger droplets and low nozzle height. Hot weather raises vapor drift risk for some herbicides.",
                                             "temperature":  "Some labels set temperature or humidity limits. An example is not applying above 85°F or under 20% humidity. Read yours.",
                                             "pollinators":  "Summer bloom continues. Clover in lawns counts. Read the label.",
                                             "coldStorage":  "Not applicable.",
                                             "heatPpe":  "PPE traps heat. Heat stress and pesticide poisoning look alike (VT ENTO-611). Stop work if suspected. Move to shade, cool the skin, remove PPE, sip cool water, get help. Extension and NIOSH-linked guidance: drink water every 15 minutes; a 10 to 15 minute break every two hours baseline; at least 7 days to acclimatize.",
                                             "truckStorage":  "Hot trucks: rule of thumb storage is below 100°F. Heat can melt plastic, build pressure, and volatilize products. Don\u0027t store in a hot cab. Open containers carefully."
                                         },
                        "customerQuestions":  [
                                                  {
                                                      "q":  "Why do I still have mosquitoes after treatment?",
                                                      "a":  "New ones fly in and breed in water. Tip out containers. A treatment lasts weeks, not a season."
                                                  },
                                                  {
                                                      "q":  "There\u0027s a nest in my wall. Can I plug it?",
                                                      "a":  "Please don\u0027t. VT warns they can chew into the house."
                                                  },
                                                  {
                                                      "q":  "Is it safe for my dog?",
                                                      "a":  "Don\u0027t say \u0027safe\u0027. Say what the label says about staying off until dry and when pets can return."
                                                  }
                                              ],
                        "regional":  {
                                         "coast":  "Longest mosquito season; ponds and marsh; Gulf Coast tick and Tidewater spotted fever noted by VT. Keep away from water per label.",
                                         "piedmont":  "Heat and humidity peak. Lone star ticks very common.",
                                         "mountains":  "Cooler mornings help PPE scheduling; fewer lone star ticks west of the Blue Ridge."
                                     },
                        "quiz":  [
                                     {
                                         "id":  "season-summer-1",
                                         "module":  "seasonal",
                                         "difficulty":  1,
                                         "question":  "A tech in full PPE gets dizzy and nauseated. What is the first step?",
                                         "choices":  [
                                                         "Finish the row",
                                                         "Drink coffee and keep on working slowly",
                                                         "Add a layer to block more of the sun",
                                                         "Stop work and get out of the area"
                                                     ],
                                         "answer":  3,
                                         "explanation":  "Signs overlap. Stop work, then first aid and medical help.",
                                         "whyNot":  [
                                                        "Keep working delays care.",
                                                        "Coffee does not fix it.",
                                                        "More layers add heat.",
                                                        null
                                                    ],
                                         "source":  "VT ENTO-611"
                                     },
                                     {
                                         "id":  "season-summer-2",
                                         "module":  "seasonal",
                                         "difficulty":  2,
                                         "question":  "How does hot, dry air affect spray droplets?",
                                         "choices":  [
                                                         "Stopping drift at the nozzle",
                                                         "Evaporating water and shrinking droplets, raising drift",
                                                         "Making droplets grow larger",
                                                         "Making droplets heavier"
                                                     ],
                                         "answer":  1,
                                         "explanation":  "Smaller droplets fall slower.",
                                         "whyNot":  [
                                                        "Hot, dry air raises drift.",
                                                        null,
                                                        "Hot, dry air shrinks droplets.",
                                                        "Droplets lose water and get smaller."
                                                    ],
                                         "source":  "Pesticide Environmental Stewardship"
                                     },
                                     {
                                         "id":  "season-summer-3",
                                         "module":  "seasonal",
                                         "difficulty":  2,
                                         "question":  "Why not leave jugs in a closed truck cab in August?",
                                         "choices":  [
                                                         "Heat can damage containers and products, and pesticides don\u0027t belong in the cab",
                                                         "It\u0027s a tax rule",
                                                         "It improves shelf life",
                                                         "Labels demand it"
                                                     ],
                                         "answer":  0,
                                         "explanation":  "Never carry pesticides in the passenger compartment. Heat is a storage hazard.",
                                         "whyNot":  [
                                                        null,
                                                        "It is not a tax rule.",
                                                        "Heat harms products.",
                                                        "The reason is heat and cab safety."
                                                    ],
                                         "source":  "Pesticide Environmental Stewardship"
                                     },
                                     {
                                         "id":  "season-summer-4",
                                         "module":  "seasonal",
                                         "difficulty":  2,
                                         "question":  "Which is the best time for heavy PPE crawl work in July?",
                                         "choices":  [
                                                         "Mid afternoon, after the sun peaks",
                                                         "Just after lunch, on a full stomach",
                                                         "The coolest part of the day",
                                                         "The hottest hour, to get it done"
                                                     ],
                                         "answer":  2,
                                         "explanation":  "VT advises scheduling PPE work for cooler hours.",
                                         "whyNot":  [
                                                        "Mid afternoon is near peak heat.",
                                                        "Just after lunch is still in the hot part of the day.",
                                                        null,
                                                        "The hottest hour has the most heat stress risk."
                                                    ],
                                         "source":  "VT ENTO-611"
                                     }
                                 ]
                    },
                    {
                        "key":  "fall",
                        "season":  "Fall",
                        "months":  "September to November",
                        "pestPressure":  [
                                             "Stink bugs seek overwintering sites September to October (Penn State).",
                                             "Lady beetles start early fall; peak near October 15 (VT).",
                                             "Mice enter in fall (VDH).",
                                             "Yellowjackets remain into early autumn, then fail with cold (VT)."
                                         ],
                        "inspectionChanges":  [
                                                  "Seal-up inspection: siding, windows, utilities.",
                                                  "Check attic vents.",
                                                  "Rodent entry check: 1/4 inch for mice, 1/2 inch for rats."
                                              ],
                        "treatmentChanges":  [
                                                 "Exclusion over spray.",
                                                 "Exterior treatment for stink bugs only just before congregation; limited residual.",
                                                 "Winterize equipment before first hard freeze. [verify manufacturer]",
                                                 "Plan termite soil jobs before ground freezes."
                                             ],
                        "weatherLabel":  {
                                             "rainRunoff":  "Leaf litter clogs drains and gutters. Sweep product from hard surfaces.",
                                             "windDrift":  "Cool, calm mornings can mean inversions. Look for fog or smoke moving sideways.",
                                             "temperature":  "Cold slows drying and water-soluble packet dissolving.",
                                             "pollinators":  "Late bloomers still draw bees. Read the label.",
                                             "coldStorage":  "Move freeze-sensitive stock before first frost. Dates differ by region.",
                                             "heatPpe":  "Early fall heat can still be high on the coast.",
                                             "truckStorage":  "Overnight lows start to matter. Check label limits."
                                         },
                        "customerQuestions":  [
                                                  {
                                                      "q":  "Why are stink bugs on my house?",
                                                      "a":  "They look for winter shelter. Sealing does more than spraying."
                                                  },
                                                  {
                                                      "q":  "Can you spray so no lady beetles come in?",
                                                      "a":  "Sealing is the main fix. VT does not recommend indoor sprays except in severe cases."
                                                  },
                                                  {
                                                      "q":  "I hear scratching at night.",
                                                      "a":  "Could be mice. Let\u0027s find the way in first."
                                                  }
                                              ],
                        "regional":  {
                                         "coast":  "Hurricane season: flooded or damaged trucks and stored products need checking; floods can move pesticides. [verify]",
                                         "piedmont":  "First frost in late October on the Fairfax table.",
                                         "mountains":  "First frost as early as October 5 to 15 in Zones 6a and 6b. Start winter storage early."
                                     },
                        "quiz":  [
                                     {
                                         "id":  "season-fall-1",
                                         "module":  "seasonal",
                                         "difficulty":  1,
                                         "question":  "When is the fall lady beetle peak in Virginia?",
                                         "choices":  [
                                                         "April 15",
                                                         "October 15",
                                                         "July 15",
                                                         "January 15"
                                                     ],
                                         "answer":  1,
                                         "explanation":  "VT gives this date.",
                                         "whyNot":  [
                                                        "April is spring.",
                                                        null,
                                                        "July is summer.",
                                                        "January is winter."
                                                    ],
                                         "source":  "VT 444-275"
                                     },
                                     {
                                         "id":  "season-fall-2",
                                         "module":  "seasonal",
                                         "difficulty":  2,
                                         "question":  "What is the main fall tool for invading stink bugs and lady beetles?",
                                         "choices":  [
                                                         "Foggers",
                                                         "Ground baits",
                                                         "Termiticides",
                                                         "Exclusion"
                                                     ],
                                         "answer":  3,
                                         "explanation":  "Sealing is best.",
                                         "whyNot":  [
                                                        "Foggers do not keep them out.",
                                                        "Baits do not stop invaders.",
                                                        "Termiticides are for termites.",
                                                        null
                                                    ],
                                         "source":  "VT 444-275; Penn State"
                                     },
                                     {
                                         "id":  "season-fall-3",
                                         "module":  "seasonal",
                                         "difficulty":  2,
                                         "question":  "Why start winter storage earlier near Roanoke than in Chesapeake?",
                                         "choices":  [
                                                         "Chesapeake gets more snow than Roanoke",
                                                         "Labels set storage dates by city or county",
                                                         "Frost arrives earlier in the mountains",
                                                         "Bees keep flying later in the mountains"
                                                     ],
                                         "answer":  2,
                                         "explanation":  "The freeze-free season is 1 to 2 months shorter in the mountainous west than Tidewater.",
                                         "whyNot":  [
                                                        "Frost timing is the reason.",
                                                        "Labels set temperature limits, not dates.",
                                                        null,
                                                        "Bees do not set storage dates."
                                                    ],
                                         "source":  "VCE SPES-673"
                                     }
                                 ]
                    },
                    {
                        "key":  "winter",
                        "season":  "Winter",
                        "months":  "December to February",
                        "pestPressure":  [
                                             "Mice and rats indoors.",
                                             "Indoor pests year-round: cockroaches, bed bugs.",
                                             "Blacklegged tick adults active in winter (VT).",
                                             "Lady beetles on warm days; rarely, wall-void yellowjacket nests persist."
                                         ],
                        "inspectionChanges":  [
                                                  "Attics, crawl spaces, kitchens.",
                                                  "Look for rodent runways.",
                                                  "Termite tubes still show in heated structures.",
                                                  "Check hose and tank for freeze damage before use."
                                              ],
                        "treatmentChanges":  [
                                                 "No termiticide on frozen soil (Termidor labels).",
                                                 "Water-soluble packets take longer to dissolve in cold water.",
                                                 "Interior focus.",
                                                 "Crawl access: watch moisture, ice, slips."
                                             ],
                        "weatherLabel":  {
                                             "rainRunoff":  "Do not apply over frozen ground where label bars it or runoff is likely. Snowmelt can carry residues.",
                                             "windDrift":  "Cold calm mornings can trap spray near the ground.",
                                             "temperature":  "Label temperature limits apply. Termidor: no frozen soil.",
                                             "pollinators":  "Low concern. Warm-day honey bee flights do happen. [verify]",
                                             "coldStorage":  "Rule of thumb keep storage above 40°F. Examples: a 2,4-D label says store above 32°F, warm to 40°F and remix if frozen; a WSP label says not below freezing; a lambda-cyhalothrin product listed \u0027do not allow to freeze\u0027. Crystals remaining after thawing: do not use. Label governs. Freezing may crack containers and separate formulations.",
                                             "heatPpe":  "Heat stress is still possible in a heated attic or crawl with PPE.",
                                             "truckStorage":  "Do not leave freeze-sensitive jugs in a truck overnight if the label bars it. Plan to bring stock into heated, locked, labeled storage. [confirm with owner: branch practice]"
                                         },
                        "customerQuestions":  [
                                                  {
                                                      "q":  "Why do I need service in winter?",
                                                      "a":  "Pests shift indoors. Regular checks catch problems early."
                                                  },
                                                  {
                                                      "q":  "Why are bugs flying in my house in February?",
                                                      "a":  "Lady beetles get active on warm days."
                                                  },
                                                  {
                                                      "q":  "Do termites stop in winter?",
                                                      "a":  "Colonies stay active below the frost line and in heated homes. [verify vs 7B Manual]"
                                                  }
                                              ],
                        "regional":  {
                                         "coast":  "Few hard freezes, so exterior work continues longer. Still follow label.",
                                         "piedmont":  "Mixed: freezes come and go. Check soil before termite jobs.",
                                         "mountains":  "Frozen soil and snow delay termite exterior work. Move stock indoors."
                                     },
                        "quiz":  [
                                     {
                                         "id":  "season-winter-1",
                                         "module":  "seasonal",
                                         "difficulty":  1,
                                         "question":  "Soil is frozen at a termite job. What should the tech do?",
                                         "choices":  [
                                                         "Do not treat until conditions meet the label",
                                                         "Treat at double the rate",
                                                         "Pour hot water on it first",
                                                         "Treat the frozen parts last"
                                                     ],
                                         "answer":  0,
                                         "explanation":  "Termidor labels bar treating frozen soil.",
                                         "whyNot":  [
                                                        null,
                                                        "Double rate breaks the label.",
                                                        "Hot water does not make it legal.",
                                                        "The label bars frozen soil."
                                                    ],
                                         "source":  "Termidor HE label"
                                     },
                                     {
                                         "id":  "season-winter-2",
                                         "module":  "seasonal",
                                         "difficulty":  2,
                                         "question":  "What can freezing do to a jug of product?",
                                         "choices":  [
                                                         "Improve the product\u0027s residual life",
                                                         "Raise the EPA number to a new series",
                                                         "Crack the container or cause separation",
                                                         "Change the signal word printed on the label"
                                                     ],
                                         "answer":  2,
                                         "explanation":  "Check the label, and the product\u0027s appearance after thawing.",
                                         "whyNot":  [
                                                        "Freezing does not improve a product.",
                                                        "EPA numbers do not change.",
                                                        null,
                                                        "Signal words do not change with cold."
                                                    ],
                                         "source":  "Pesticide Environmental Stewardship"
                                     },
                                     {
                                         "id":  "season-winter-3",
                                         "module":  "seasonal",
                                         "difficulty":  2,
                                         "question":  "Crystals remain in a product after it thaws. What do you do?",
                                         "choices":  [
                                                         "Do not use it",
                                                         "Stir and spray at twice the rate",
                                                         "Filter it through a shirt",
                                                         "Add antifreeze"
                                                     ],
                                         "answer":  0,
                                         "explanation":  "Extension says not to use it. Contact the manufacturer or dispose properly.",
                                         "whyNot":  [
                                                        null,
                                                        "Twice the rate breaks the label.",
                                                        "Filtering does not fix it.",
                                                        "Additives are not on the label."
                                                    ],
                                         "source":  "Montana State; Pesticide Environmental Stewardship"
                                     },
                                     {
                                         "id":  "season-winter-4",
                                         "module":  "seasonal",
                                         "difficulty":  2,
                                         "question":  "How do water-soluble packets act in very cold water?",
                                         "choices":  [
                                                         "Dissolve right away on contact",
                                                         "Stay whole and will not dissolve",
                                                         "Turn into dust in the tank",
                                                         "Take longer to dissolve"
                                                     ],
                                         "answer":  3,
                                         "explanation":  "Cooler water increases dissolving time.",
                                         "whyNot":  [
                                                        "Cold slows dissolving.",
                                                        "They do dissolve, just slower.",
                                                        "Packets do not turn to dust.",
                                                        null
                                                    ],
                                         "source":  "Imidacloprid WSP EPA label [verify current label]"
                                     }
                                 ]
                    }
                ],
    "pressureCalendar":  [
                             {
                                 "pest":  "Multicolored Asian lady beetle (indoor nuisance)",
                                 "source":  "https://www.pubs.ext.vt.edu/444/444-275/444-275.html",
                                 "sourceNote":  "VT Extension 444-275: \u0027start entering houses in early fall\u0027 = Sep 2; \u0027peak of activity around October 15\u0027 = Oct 3; \u0027second peak in late March\u0027 = Mar 3; \u0027active on warm days in the fall and winter\u0027 = Nov to Feb 1. Apr to Aug: source describes no indoor activity = 0. Virginia-wide statement; no regional data.",
                                 "levels":  {
                                                "statewide":  [
                                                                  1,
                                                                  1,
                                                                  3,
                                                                  0,
                                                                  0,
                                                                  0,
                                                                  0,
                                                                  0,
                                                                  2,
                                                                  3,
                                                                  1,
                                                                  1
                                                              ]
                                            }
                             },
                             {
                                 "pest":  "Yellowjackets",
                                 "source":  "https://pubs.ext.vt.edu/ENTO/ENTO-49/ENTO-49.html",
                                 "sourceNote":  "VT Extension ENTO-49: nuisance \u0027from late summer until early autumn when colonies are at their largest size\u0027 = Aug and Sep 3. Sanitation advised from \u0027early summer\u0027 through \u0027mid-autumn\u0027 = Jun, Jul, Oct 1. Nests \u0027begin to fail in the fall\u0027 with cold. Other months: no foraging pressure described = 0. Virginia-wide statement; no regional data.",
                                 "levels":  {
                                                "statewide":  [
                                                                  0,
                                                                  0,
                                                                  0,
                                                                  0,
                                                                  0,
                                                                  1,
                                                                  1,
                                                                  3,
                                                                  3,
                                                                  1,
                                                                  0,
                                                                  0
                                                              ]
                                            }
                             },
                             {
                                 "pest":  "Lone star tick",
                                 "source":  "https://www.pubs.ext.vt.edu/ENTO/ento-504/ento-504.html",
                                 "sourceNote":  "VT Extension ENTO-504: all life stages \u0027active in the spring and summer\u0027 = Mar to May 2; \u0027summer months when the lone star tick is most active\u0027 = Jun to Aug 3. Fall and winter not described = 0. Regional from VT ENTO-487 (https://www.pubs.ext.vt.edu/content/dam/pubs_ext_vt_edu/2906/2906-1396/ENTO-487.pdf, seen as a search summary): found mostly east of the Blue Ridge, very common in Piedmont and Coastal Plain. Coast and Piedmont keep the statewide levels; mountains are lowered one level. That one-level step is a translation of \u0027mostly east of the Blue Ridge\u0027, not a measured value, and the source gives no monthly regional data.",
                                 "levels":  {
                                                "statewide":  [
                                                                  0,
                                                                  0,
                                                                  2,
                                                                  2,
                                                                  2,
                                                                  3,
                                                                  3,
                                                                  3,
                                                                  0,
                                                                  0,
                                                                  0,
                                                                  0
                                                              ]
                                            },
                                 "regional":  {
                                                  "coast":  [
                                                                0,
                                                                0,
                                                                2,
                                                                2,
                                                                2,
                                                                3,
                                                                3,
                                                                3,
                                                                0,
                                                                0,
                                                                0,
                                                                0
                                                            ],
                                                  "piedmont":  [
                                                                   0,
                                                                   0,
                                                                   2,
                                                                   2,
                                                                   2,
                                                                   3,
                                                                   3,
                                                                   3,
                                                                   0,
                                                                   0,
                                                                   0,
                                                                   0
                                                               ],
                                                  "mountains":  [
                                                                    0,
                                                                    0,
                                                                    1,
                                                                    1,
                                                                    1,
                                                                    2,
                                                                    2,
                                                                    2,
                                                                    0,
                                                                    0,
                                                                    0,
                                                                    0
                                                                ]
                                              }
                             },
                             {
                                 "pest":  "American dog tick",
                                 "source":  "https://www.pubs.ext.vt.edu/ENTO/ento-504/ento-504.html",
                                 "sourceNote":  "VT Extension ENTO-504: adults bite humans and are \u0027active during the spring and summer\u0027 = Mar to Aug 2. No peak month stated, so no 3. Fall and winter not described = 0. No regional data.",
                                 "levels":  {
                                                "statewide":  [
                                                                  0,
                                                                  0,
                                                                  2,
                                                                  2,
                                                                  2,
                                                                  2,
                                                                  2,
                                                                  2,
                                                                  0,
                                                                  0,
                                                                  0,
                                                                  0
                                                              ]
                                            }
                             },
                             {
                                 "pest":  "Blacklegged tick",
                                 "source":  "https://www.pubs.ext.vt.edu/ENTO/ento-504/ento-504.html",
                                 "sourceNote":  "VT Extension ENTO-504: \u0027active year-round\u0027, nymphs in spring and summer, adults in winter = Dec to May 2. \u0027Heightened case counts during the summer months\u0027 for Lyme = Jun to Aug 3. Sep to Nov: year-round statement only, no life stage named = 1. VT notes higher Lyme prevalence in northern and southwestern Virginia, but that is disease data by area, not tick timing by region, so no regional levels are given.",
                                 "levels":  {
                                                "statewide":  [
                                                                  2,
                                                                  2,
                                                                  2,
                                                                  2,
                                                                  2,
                                                                  3,
                                                                  3,
                                                                  3,
                                                                  1,
                                                                  1,
                                                                  1,
                                                                  2
                                                              ]
                                            }
                             },
                             {
                                 "pest":  "Gulf Coast tick",
                                 "source":  "https://www.pubs.ext.vt.edu/ENTO/ento-504/ento-504.html",
                                 "sourceNote":  "VT Extension ENTO-504: adults \u0027active during the summer\u0027 = Jun to Aug 2. No peak stated. Other months not described = 0. Source gives no regional distribution, so no regional levels.",
                                 "levels":  {
                                                "statewide":  [
                                                                  0,
                                                                  0,
                                                                  0,
                                                                  0,
                                                                  0,
                                                                  2,
                                                                  2,
                                                                  2,
                                                                  0,
                                                                  0,
                                                                  0,
                                                                  0
                                                              ]
                                            }
                             },
                             {
                                 "pest":  "Brown marmorated stink bug",
                                 "source":  "https://extension.psu.edu/brown-marmorated-stink-bug",
                                 "sourceNote":  "Penn State Extension, NOT a Virginia source: adults emerge \u0027late April to mid-May\u0027 = Apr and May 1; \u0027search for overwintering sites starting in September through October\u0027 = Sep and Oct 3 (the named home-invasion window). Other months not described for structures = 0. Virginia timing may differ somewhat; no Virginia Tech dated sheet was retrieved. No regional data.",
                                 "levels":  {
                                                "statewide":  [
                                                                  0,
                                                                  0,
                                                                  0,
                                                                  1,
                                                                  1,
                                                                  0,
                                                                  0,
                                                                  0,
                                                                  3,
                                                                  3,
                                                                  0,
                                                                  0
                                                              ]
                                            }
                             },
                             {
                                 "pest":  "Powderpost beetles (emergence)",
                                 "source":  "https://content.ces.ncsu.edu/powderpost-beetles-and-wood-inhabiting-fungi",
                                 "sourceNote":  "NC State Extension, NOT a Virginia source: \u0027peak time to watch for emerging beetles is usually May through August\u0027 = May to Aug 3; holes and frass \u0027almost any time of the year\u0027 = other months 1. Written for North Carolina; no Virginia dates found. No regional data.",
                                 "levels":  {
                                                "statewide":  [
                                                                  1,
                                                                  1,
                                                                  1,
                                                                  1,
                                                                  3,
                                                                  3,
                                                                  3,
                                                                  3,
                                                                  1,
                                                                  1,
                                                                  1,
                                                                  1
                                                              ]
                                            }
                             }
                         ],
    "pressureCalendarKey":  {
                                "months":  "Arrays run January to December.",
                                "3":  "Source names this as a peak, most active period, largest colony period, or the main named window.",
                                "2":  "Source says active in this period, with no peak stated.",
                                "1":  "Source describes minor, occasional, or incidental activity.",
                                "0":  "Source describes no activity for this month. This means no sourced pressure, NOT that the pest is absent. Do not show it as \u0027none\u0027.",
                                "seasonMap":  "Spring = Mar-May, summer = Jun-Aug, fall = Sep-Nov, winter = Dec-Feb, late summer = Aug, early autumn = Sep.",
                                "regionFallback":  "Only the lone star tick has regional arrays. For all others, the region switch should show the statewide row and say no regional data was found."
                            },
    "pressureCalendarExcluded":  [
                                     {
                                         "pest":  "Eastern subterranean termite",
                                         "reason":  "No retrievable Virginia dates. NC State publications conflict: late winter to fall in one, late spring to late summer in another. Not graded."
                                     },
                                     {
                                         "pest":  "Carpenter ant",
                                         "reason":  "Rutgers dates are stated for the Northeast only; Ohio State gives swarmers only. Neither transfers to Virginia without estimating."
                                     },
                                     {
                                         "pest":  "Carpenter bee",
                                         "reason":  "Only a one-site Virginia survey listing spring and summer. No months or pressure language."
                                     },
                                     {
                                         "pest":  "House mouse",
                                         "reason":  "Timing comes from Virginia Department of Health and DWR, not extension or university, and says only fall and winter."
                                     },
                                     {
                                         "pest":  "Norway rat",
                                         "reason":  "No extension or university timing found."
                                     },
                                     {
                                         "pest":  "Asian tiger mosquito",
                                         "reason":  "Timing comes from press, county, and commercial sources. No extension source found."
                                     },
                                     {
                                         "pest":  "German cockroach",
                                         "reason":  "Indoor, no sourced seasonality."
                                     },
                                     {
                                         "pest":  "Bed bug",
                                         "reason":  "Indoor, no sourced seasonality."
                                     }
                                 ]
};

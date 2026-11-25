window.NF = window.NF || {};
NF.questionsCore = [
    {
        "id":  "core-001",
        "module":  "laws",
        "difficulty":  1,
        "question":  "Which Virginia office certifies pesticide applicators?",
        "choices":  [
                        "VDACS Office of Pesticide Services",
                        "Virginia Department of Health",
                        "Virginia DMV",
                        "Virginia Department of Environmental Quality"
                    ],
        "answer":  0,
        "explanation":  "VDACS Office of Pesticide Services runs certification. DMV is only one place the exams can be taken.",
        "whyNot":  [
                       null,
                       "VDH handles public health, not applicator certification.",
                       "DMV is one place to take the exam. It does not certify.",
                       "DEQ handles environmental permits, not applicator certification."
                   ],
        "source":  "VDACS Pesticide Applicator Certification page"
    },
    {
        "id":  "core-002",
        "module":  "laws",
        "difficulty":  1,
        "question":  "When may a certified Registered Technician apply a general-use pesticide?",
        "choices":  [
                        "After calling the office for approval",
                        "On commercial accounts but not homes",
                        "Without supervision",
                        "With a commercial applicator on the property"
                    ],
        "answer":  2,
        "explanation":  "Registered Technicians may use general-use pesticides unsupervised. Restricted-use products are different.",
        "whyNot":  [
                       "No office call is required for general-use work.",
                       "RT rules do not split homes from commercial accounts.",
                       null,
                       "On-site supervision is for trainees and RUP work, not an RT\u0027s general-use work."
                   ],
        "source":  "VDACS RT packet (01/2025)"
    },
    {
        "id":  "core-003",
        "module":  "laws",
        "difficulty":  1,
        "question":  "When may a Registered Technician use a restricted-use pesticide?",
        "choices":  [
                        "Only outdoors, at half the labeled rate",
                        "Only under the direct supervision of a certified commercial applicator",
                        "Only after a full year on the job as a certified RT",
                        "Only on commercial sites, with the customer\u0027s written okay"
                    ],
        "answer":  1,
        "explanation":  "RTs are limited to RUPs under direct supervision of a certified commercial applicator.",
        "whyNot":  [
                       "Rate and location do not matter here. Using half the label rate also breaks the label.",
                       null,
                       "Time on the job does not unlock RUP use. Supervision is the rule.",
                       "Customer consent does not replace the supervision rule."
                   ],
        "source":  "2VAC5-685-10"
    },
    {
        "id":  "core-004",
        "module":  "laws",
        "difficulty":  2,
        "question":  "What does \u0027direct on-site supervision\u0027 require of the commercial applicator?",
        "choices":  [
                        "On call by cell phone and free to reach the site in an hour or two today",
                        "At the branch office that day and listed as the supervisor",
                        "In the same town and named on each service record",
                        "On the property and in constant visual contact with the person applying"
                    ],
        "answer":  3,
        "explanation":  "The on-site version adds physical presence and constant visual contact to the basic direct supervision definition.",
        "whyNot":  [
                       "Being reachable by phone is not on-site. The applicator must be present.",
                       "Being at the branch is not being on the property.",
                       "Being in town or on a service record is not constant visual contact.",
                       null
                   ],
        "source":  "2VAC5-685-10"
    },
    {
        "id":  "core-005",
        "module":  "laws",
        "difficulty":  2,
        "question":  "How may a trainee who has not passed the RT exam apply pesticides commercially?",
        "choices":  [
                        "Alone, as long as the product is a general-use product",
                        "Alone, if a certified applicator can be reached by radio",
                        "Not at all until the permanent certificate arrives",
                        "Only under direct on-site supervision of a certified commercial applicator"
                    ],
        "answer":  3,
        "explanation":  "Uncertified trainees may apply commercially only under direct on-site supervision.",
        "whyNot":  [
                       "General-use status does not let an uncertified trainee work alone.",
                       "Radio contact is not enough. Trainees need the applicator on site.",
                       "Trainees may apply under direct on-site supervision. A total ban is too strict.",
                       null
                   ],
        "source":  "VDACS Responsibilities document; 2VAC5-685-20"
    },
    {
        "id":  "core-006",
        "module":  "laws",
        "difficulty":  2,
        "question":  "A trainee misses the 90-day window to pass the RT exam. What happens?",
        "choices":  [
                        "A two-year wait applies before the trainee can test again",
                        "No commercial application, even under direct on-site supervision, until passing",
                        "Supervised work goes on as normal until the next exam date",
                        "General-use work alone is fine while the trainee waits to retest"
                    ],
        "answer":  1,
        "explanation":  "The regulation stops commercial application, even supervised, until the exam is passed.",
        "whyNot":  [
                       "No two-year wait applies. The trainee may reapply and retest.",
                       null,
                       "The rule stops all commercial application, supervised or not.",
                       "Working alone is never allowed for an uncertified trainee."
                   ],
        "source":  "2VAC5-685-50"
    },
    {
        "id":  "core-007",
        "module":  "laws",
        "difficulty":  1,
        "question":  "How long must a Virginia licensed pesticide business keep application records?",
        "choices":  [
                        "2 years",
                        "1 year",
                        "18 months",
                        "5 years"
                    ],
        "answer":  0,
        "explanation":  "Pesticide businesses keep required records for two years.",
        "whyNot":  [
                       null,
                       "One year is too short. Virginia requires two years.",
                       "Eighteen months is too short. Virginia requires two years.",
                       "Five years is longer than the Virginia rule of two years."
                   ],
        "source":  "2VAC5-680-50"
    },
    {
        "id":  "core-008",
        "module":  "laws",
        "difficulty":  1,
        "question":  "Which applications must a Virginia pesticide business record?",
        "choices":  [
                        "Outdoor applications over one gallon of finished mix",
                        "Applications the customer asks to have written down",
                        "Every pesticide applied, general use and restricted use",
                        "Restricted-use pesticides, plus general use at food sites"
                    ],
        "answer":  2,
        "explanation":  "The rule covers each pesticide applied, both general use and restricted use.",
        "whyNot":  [
                       "Size and location do not matter. Every application is recorded.",
                       "Records are required by law, not by customer request.",
                       null,
                       "Virginia records cover every application, not just RUPs or food sites."
                   ],
        "source":  "2VAC5-680-65"
    },
    {
        "id":  "core-009",
        "module":  "laws",
        "difficulty":  2,
        "question":  "Which item is required on a Virginia application record?",
        "choices":  [
                        "The forecast temperature for the next 24 hours",
                        "EPA registration number of the product",
                        "The customer\u0027s date of birth and driver\u0027s license number",
                        "The price charged"
                    ],
        "answer":  1,
        "explanation":  "Required items include EPA registration number, product name, amounts of concentrate and diluent, and equipment type.",
        "whyNot":  [
                       "Weather forecasts are not a required record item.",
                       null,
                       "Birth date and license number are not on the required list.",
                       "Price is not one of the required record items."
                   ],
        "source":  "2VAC5-680-65"
    },
    {
        "id":  "core-010",
        "module":  "laws",
        "difficulty":  2,
        "question":  "A service video goes to the customer, but the service record has no concentrate or diluent amounts. Is it complete?",
        "choices":  [
                        "Yes. A dated service video takes the place of those amounts",
                        "Yes, if the customer signs",
                        "Yes, because those amounts matter for restricted-use products",
                        "No. Amounts of concentrate and diluent must be recorded"
                    ],
        "answer":  3,
        "explanation":  "The regulation lists amounts of concentrate and diluent by weight or volume. A video is not a listed substitute.",
        "whyNot":  [
                       "A video is not listed as a substitute for the required amounts.",
                       "A customer signature does not supply the missing amounts.",
                       "The amounts are required for general-use products too.",
                       null
                   ],
        "source":  "2VAC5-680-65"
    },
    {
        "id":  "core-011",
        "module":  "laws",
        "difficulty":  2,
        "question":  "VDACS asks in writing for records that are not readily available. How fast must you send them?",
        "choices":  [
                        "Within 10 working days",
                        "Within 30 days",
                        "Within 72 hours",
                        "Within 24 hours"
                    ],
        "answer":  2,
        "explanation":  "If records are not readily available, they can be requested in writing for submission within 72 hours.",
        "whyNot":  [
                       "10 working days is the written incident report deadline, not records.",
                       "30 days is far past the 72-hour limit.",
                       null,
                       "24 hours is shorter than the rule. The limit is 72 hours."
                   ],
        "source":  "2VAC5-680-50"
    },
    {
        "id":  "core-012",
        "module":  "laws",
        "difficulty":  2,
        "question":  "A pesticide incident threatens public safety. What is the latest you can phone OPS?",
        "choices":  [
                        "Within 48 hours",
                        "Within 72 hours",
                        "Within 10 working days",
                        "Within 30 days"
                    ],
        "answer":  0,
        "explanation":  "Phone notice is normally immediate and not later than 48 hours after the incident.",
        "whyNot":  [
                       null,
                       "72 hours is too late. The phone limit is 48 hours.",
                       "10 working days is the written report deadline, not the phone call.",
                       "30 days is far past the 48-hour phone limit."
                   ],
        "source":  "2VAC5-685-170"
    },
    {
        "id":  "core-013",
        "module":  "laws",
        "difficulty":  2,
        "question":  "After the first phone call about an incident, when is the written report due?",
        "choices":  [
                        "30 calendar days",
                        "90 days",
                        "10 working days",
                        "48 hours"
                    ],
        "answer":  2,
        "explanation":  "The written report is due within 10 working days of initial notification.",
        "whyNot":  [
                       "30 calendar days is too long. The rule says 10 working days.",
                       "90 days is far past the 10 working day limit.",
                       null,
                       "48 hours is the phone call limit, not the written report."
                   ],
        "source":  "2VAC5-685-170"
    },
    {
        "id":  "core-014",
        "module":  "laws",
        "difficulty":  2,
        "question":  "A general-use product spill threatens a stream. Must it be reported?",
        "choices":  [
                        "Yes. It applies whether or not an RUP is involved",
                        "No. That rule is limited to restricted-use products",
                        "Yes, but just for spills larger than five gallons",
                        "No, unless a person was hurt in the incident"
                    ],
        "answer":  0,
        "explanation":  "Virginia\u0027s rule applies to incidents threatening people, public health or safety, or the environment, RUP or not.",
        "whyNot":  [
                       null,
                       "The rule covers incidents with or without an RUP.",
                       "The rule has no five-gallon cutoff. A threat to the environment triggers it.",
                       "Injury is not required. A threat to the environment is enough."
                   ],
        "source":  "2VAC5-685-170"
    },
    {
        "id":  "core-015",
        "module":  "laws",
        "difficulty":  1,
        "question":  "A company has branches in three Virginia cities. How many business licenses does it need?",
        "choices":  [
                        "One for the whole company",
                        "One for each technician",
                        "Zero if a commercial applicator owns it",
                        "One for each location"
                    ],
        "answer":  3,
        "explanation":  "Each pesticide business location must be licensed.",
        "whyNot":  [
                       "Virginia licenses each location, not the company as a whole.",
                       "Licenses go to business locations, not to each technician.",
                       "A commercial applicator owner skips the business exam, not the license.",
                       null
                   ],
        "source":  "2VAC5-680-20"
    },
    {
        "id":  "core-016",
        "module":  "laws",
        "difficulty":  2,
        "question":  "When do Virginia pesticide business licenses expire each year?",
        "choices":  [
                        "August 29",
                        "March 31",
                        "June 30",
                        "December 31"
                    ],
        "answer":  1,
        "explanation":  "Business licenses expire March 31. June 30 is the applicator certificate date.",
        "whyNot":  [
                       "August 29 is the end of the certificate grace period.",
                       null,
                       "June 30 is when applicator certificates expire.",
                       "December 31 is when private applicator certificates expire."
                   ],
        "source":  "2VAC5-680-20"
    },
    {
        "id":  "core-017",
        "module":  "laws",
        "difficulty":  2,
        "question":  "How often do Virginia applicator certificates renew?",
        "choices":  [
                        "5 years",
                        "2 years",
                        "1 year",
                        "3 years"
                    ],
        "answer":  1,
        "explanation":  "Certificates renew biennially, expiring June 30 of the year shown.",
        "whyNot":  [
                       "Five years is the federal maximum, not Virginia\u0027s two-year cycle.",
                       null,
                       "Renewal is every two years, not every year.",
                       "Three years is longer than the two-year cycle."
                   ],
        "source":  "2VAC5-685-130"
    },
    {
        "id":  "core-018",
        "module":  "laws",
        "difficulty":  2,
        "question":  "A certificate expired June 30. No recertification course was taken by September. What now?",
        "choices":  [
                        "The tech must be reexamined",
                        "The tech pays a late fee",
                        "The tech has until December 31",
                        "Nothing changes for general-use products"
                    ],
        "answer":  0,
        "explanation":  "After 60 days past expiration, the only route is reexamination.",
        "whyNot":  [
                       null,
                       "Renewal fees were eliminated. Lapsing past 60 days means retesting.",
                       "The grace period is 60 days, ending August 29.",
                       "A lapsed certificate does not cover any pesticide use."
                   ],
        "source":  "2VAC5-685-130; VDACS Commercial packet"
    },
    {
        "id":  "core-019",
        "module":  "laws",
        "difficulty":  1,
        "question":  "Is using a pesticide against its label legal?",
        "choices":  [
                        "Acceptable if the customer agrees",
                        "Acceptable for professionals",
                        "Acceptable at lower cost",
                        "A violation of the law"
                    ],
        "answer":  3,
        "explanation":  "Use inconsistent with labeling is unlawful under FIFRA and Virginia Code.",
        "whyNot":  [
                       "Customer agreement does not override the label.",
                       "Professionals are bound by the label like anyone else.",
                       "Saving money is not a reason the law allows.",
                       null
                   ],
        "source":  "Code of Virginia 3.2-3939; FIFRA"
    },
    {
        "id":  "core-020",
        "module":  "laws",
        "difficulty":  2,
        "question":  "What does the federal Worker Protection Standard mainly cover?",
        "choices":  [
                        "Homes, apartments and other residential pest control jobs",
                        "Government buildings and public school grounds",
                        "Agricultural establishments such as farms, forests, nurseries, greenhouses",
                        "Food processing plants and commercial kitchens"
                    ],
        "answer":  2,
        "explanation":  "WPS defines agricultural establishment as any farm, forest, nursery or greenhouse.",
        "whyNot":  [
                       "WPS is not aimed at routine residential pest control.",
                       "Government buildings and schools are not WPS agricultural sites.",
                       null,
                       "Food plants are not the agricultural establishments WPS targets."
                   ],
        "source":  "40 CFR 170.3"
    },
    {
        "id":  "core-021",
        "module":  "laws",
        "difficulty":  2,
        "question":  "A landlord wants pesticide applied inside an occupied unit. Without tenant agreement, how much written notice is needed?",
        "choices":  [
                        "3 business days before",
                        "24 hours before",
                        "48 hours before",
                        "72 hours before"
                    ],
        "answer":  2,
        "explanation":  "Virginia\u0027s landlord-tenant law sets 48 hours written notice, unless the tenant agrees to less or asked for the application.",
        "whyNot":  [
                       "The law sets 48 hours, not 3 business days.",
                       "24 hours is too short. The law sets 48 hours.",
                       null,
                       "72 hours is more than the 48 hours the law sets."
                   ],
        "source":  "Code of Virginia 55.1-1223"
    },
    {
        "id":  "core-022",
        "module":  "laws",
        "difficulty":  3,
        "question":  "A concentrate is carried in a small unmarked bottle. What label does Virginia require?",
        "choices":  [
                        "Nothing, as long as the bottle holds less than one pint",
                        "The applicator\u0027s name, the date filled and the words \u0027Do Not Drink\u0027",
                        "The company name, branch phone number, and a use-by date written on a tag",
                        "A secure label with product name, EPA Reg. No., active ingredient percentages, signal word"
                    ],
        "answer":  3,
        "explanation":  "Concentrate service containers require this label regardless of container size.",
        "whyNot":  [
                       "Concentrate service containers need a label at any size.",
                       "The rule asks for product, EPA number, actives and signal word, not these.",
                       "A phone number and use-by date are not the required items.",
                       null
                   ],
        "source":  "2VAC5-670-210"
    },
    {
        "id":  "core-023",
        "module":  "laws",
        "difficulty":  3,
        "question":  "Which end-use dilution container is exempt from Virginia\u0027s service label rule?",
        "choices":  [
                        "A hand-held sprayer of 3 gallons or less used as an application device",
                        "A 50-gallon truck tank, if the truck has a pesticide business permit",
                        "Any size tank on a licensed vehicle, if the driver has the label",
                        "A 5-gallon jug of dilution in a locked box on the truck"
                    ],
        "answer":  0,
        "explanation":  "End-use dilution containers of 3 gallons liquid or 3 pounds dry or less, used as application devices, are exempt.",
        "whyNot":  [
                       null,
                       "A 50-gallon tank is over the 3-gallon exemption.",
                       "The exemption is by size and use, not by vehicle license.",
                       "A 5-gallon jug is over the 3-gallon limit and is not an application device."
                   ],
        "source":  "2VAC5-670-210"
    },
    {
        "id":  "core-024",
        "module":  "laws",
        "difficulty":  2,
        "question":  "What minimum insurance per occurrence must a Virginia pesticide business carry?",
        "choices":  [
                        "$1,000,000",
                        "$300,000",
                        "$100,000",
                        "$500,000"
                    ],
        "answer":  1,
        "explanation":  "Minimums are $100,000 property, $100,000 injury or death of one person, and $300,000 per occurrence.",
        "whyNot":  [
                       "$1,000,000 is not the Virginia minimum.",
                       null,
                       "$100,000 is the minimum for property damage and per person, not per occurrence.",
                       "$500,000 is above the Virginia per-occurrence minimum."
                   ],
        "source":  "Code of Virginia 3.2-3927"
    },
    {
        "id":  "core-025",
        "module":  "laws",
        "difficulty":  1,
        "question":  "What does Bulletins Live! Two protect?",
        "choices":  [
                        "Endangered and threatened species",
                        "Honey bee hives kept on working farms",
                        "Customers from overpriced treatment plans",
                        "Applicators in extreme heat"
                    ],
        "answer":  0,
        "explanation":  "Bulletins Live! Two gives geographically specific pesticide use limits for protecting listed species.",
        "whyNot":  [
                       null,
                       "It covers listed endangered species, not farm bee hives in general.",
                       "It is about species protection, not pricing.",
                       "Heat safety is not its purpose."
                   ],
        "source":  "EPA Bulletins Live! Two"
    },
    {
        "id":  "core-026",
        "module":  "labels",
        "difficulty":  1,
        "question":  "What do signal words describe?",
        "choices":  [
                        "How long the product persists in the environment",
                        "How well the product controls the target pest",
                        "Acute toxicity of the formulated product",
                        "Long-term cancer risk"
                    ],
        "answer":  2,
        "explanation":  "Signal words reflect short-term toxicity of the product as sold.",
        "whyNot":  [
                       "Persistence in the environment is not what the signal word shows.",
                       "Signal words do not rate how well a product works.",
                       null,
                       "Signal words cover short-term toxicity, not long-term cancer risk."
                   ],
        "source":  "NPIC Signal Words"
    },
    {
        "id":  "core-027",
        "module":  "labels",
        "difficulty":  1,
        "question":  "Which signal word indicates the highest acute toxicity?",
        "choices":  [
                        "NOTICE",
                        "DANGER",
                        "WARNING",
                        "CAUTION"
                    ],
        "answer":  1,
        "explanation":  "DANGER goes with Toxicity Category I, the highest.",
        "whyNot":  [
                       "NOTICE is not an EPA signal word.",
                       null,
                       "WARNING is Category II, one step below DANGER.",
                       "CAUTION is Category III, a low toxicity rating."
                   ],
        "source":  "40 CFR 156.64"
    },
    {
        "id":  "core-028",
        "module":  "labels",
        "difficulty":  2,
        "question":  "When must a skull and crossbones appear with words on the label?",
        "choices":  [
                        "WARNING and POISON, for any Category II product sold for home use",
                        "CAUTION and POISON, on rodent baits in tamper-resistant stations",
                        "DANGER alone, for Category I skin or eye damage products",
                        "DANGER and POISON, when Category I is due to oral, inhalation or dermal toxicity"
                    ],
        "answer":  3,
        "explanation":  "Category I based on oral, inhalation or dermal toxicity requires POISON in red plus the skull and crossbones.",
        "whyNot":  [
                       "POISON and the skull are tied to Category I, not Category II.",
                       "CAUTION products do not carry POISON or the skull.",
                       "DANGER from skin or eye damage alone does not need the skull.",
                       null
                   ],
        "source":  "40 CFR 156.64"
    },
    {
        "id":  "core-029",
        "module":  "labels",
        "difficulty":  2,
        "question":  "A product\u0027s oral LD50 is 300 mg/kg with no other hazards. What is its signal word?",
        "choices":  [
                        "DANGER",
                        "CAUTION",
                        "None required",
                        "WARNING"
                    ],
        "answer":  3,
        "explanation":  "Over 50 through 500 mg/kg oral is Toxicity Category II, signal word WARNING.",
        "whyNot":  [
                       "DANGER is for oral LD50 of 50 mg/kg or less.",
                       "CAUTION starts above 500 mg/kg oral.",
                       "Category IV starts above 5,000 mg/kg oral.",
                       null
                   ],
        "source":  "EPA Label Review Manual Ch. 7"
    },
    {
        "id":  "core-030",
        "module":  "labels",
        "difficulty":  2,
        "question":  "A product is DANGER only because of severe eye damage. Does it need a skull and crossbones?",
        "choices":  [
                        "It depends, because it is required on restricted-use products",
                        "No. That symbol is tied to oral, inhalation or dermal toxicity",
                        "Yes. Any product with the DANGER signal word must carry it",
                        "Yes, if the product is sold or used in the state of Virginia"
                    ],
        "answer":  1,
        "explanation":  "The POISON and skull rule applies when Category I rests on oral, inhalation or dermal toxicity, not skin or eye irritation.",
        "whyNot":  [
                       "RUP status does not decide the skull. Toxicity route does.",
                       null,
                       "The skull is tied to oral, inhalation or dermal toxicity, not every DANGER label.",
                       "The rule is federal and does not change by state."
                   ],
        "source":  "40 CFR 156.64"
    },
    {
        "id":  "core-031",
        "module":  "labels",
        "difficulty":  3,
        "question":  "What signal word does a product in Category IV by all routes need?",
        "choices":  [
                        "Is not required to carry a signal word",
                        "Must carry WARNING on the front panel in capital letters",
                        "Must carry DANGER",
                        "May not be sold in Virginia without a special permit"
                    ],
        "answer":  0,
        "explanation":  "Category IV is not required to bear a signal word. If one is used it must be CAUTION.",
        "whyNot":  [
                       null,
                       "WARNING is for Category II.",
                       "DANGER is for Category I.",
                       "Category IV is the lowest toxicity, not a reason to stop sales."
                   ],
        "source":  "40 CFR 156.64"
    },
    {
        "id":  "core-032",
        "module":  "labels",
        "difficulty":  1,
        "question":  "Which number identifies a specific registered pesticide product?",
        "choices":  [
                        "Lot number",
                        "UPC code",
                        "EPA Registration Number",
                        "EPA Establishment Number"
                    ],
        "answer":  2,
        "explanation":  "EPA Reg. No. identifies the product. EPA Est. No. identifies the producing facility.",
        "whyNot":  [
                       "A lot number tracks a batch, not the registration.",
                       "A UPC is a sales code, not an EPA identity.",
                       null,
                       "The Establishment Number shows the factory, not the product."
                   ],
        "source":  "Termidor HE label; NPIC Reading Pesticide Labels"
    },
    {
        "id":  "core-033",
        "module":  "labels",
        "difficulty":  1,
        "question":  "What does the EPA Establishment Number tell you?",
        "choices":  [
                        "Its re-entry time",
                        "Which facility produced the product",
                        "Which pests the product is labeled to control",
                        "Which toxicity category the product falls in"
                    ],
        "answer":  1,
        "explanation":  "Est. means establishment, the place of manufacture.",
        "whyNot":  [
                       "Re-entry times are in the directions, not this number.",
                       null,
                       "Target pests are in the Directions for Use.",
                       "Toxicity shows in the signal word, not this number."
                   ],
        "source":  "NPIC Reading Pesticide Labels; general label knowledge [verify vs Core Manual]"
    },
    {
        "id":  "core-034",
        "module":  "labels",
        "difficulty":  1,
        "question":  "Where on the label are required gloves listed?",
        "choices":  [
                        "Storage and Disposal, next to the container rules",
                        "Conditions of Sale, in the warranty wording",
                        "The ingredient statement, below the active percentages",
                        "Precautionary Statements, under Personal Protective Equipment"
                    ],
        "answer":  3,
        "explanation":  "PPE appears under Precautionary Statements.",
        "whyNot":  [
                       "Storage and Disposal covers storing and containers, not PPE.",
                       "Conditions of Sale cover warranty terms, not PPE.",
                       "The ingredient statement lists contents, not PPE.",
                       null
                   ],
        "source":  "Termidor HE label"
    },
    {
        "id":  "core-035",
        "module":  "labels",
        "difficulty":  1,
        "question":  "Where does the label say how to handle the empty container?",
        "choices":  [
                        "Environmental Hazards",
                        "Active Ingredients",
                        "Storage and Disposal",
                        "First Aid"
                    ],
        "answer":  2,
        "explanation":  "Container handling is a part of Storage and Disposal.",
        "whyNot":  [
                       "Environmental Hazards warns about wildlife and water, not containers.",
                       "The ingredient list shows contents only.",
                       null,
                       "First Aid covers exposure care, not containers."
                   ],
        "source":  "Termidor HE label; NPIC Reading Pesticide Labels"
    },
    {
        "id":  "core-036",
        "module":  "labels",
        "difficulty":  2,
        "question":  "A label says \u0027DO NOT use for general pest control.\u0027 You have ants and only that product. What do you do?",
        "choices":  [
                        "Not use it for ants",
                        "Use it at half the rate",
                        "Use it outdoors around the foundation",
                        "Get a verbal okay from the customer"
                    ],
        "answer":  0,
        "explanation":  "Termidor HE carries this restriction. Label restrictions are binding.",
        "whyNot":  [
                       null,
                       "Lowering the rate does not make a banned use legal.",
                       "Outdoor use for ants is still general pest control.",
                       "A customer okay cannot override the label."
                   ],
        "source":  "Termidor HE label"
    },
    {
        "id":  "core-037",
        "module":  "labels",
        "difficulty":  2,
        "question":  "A label says \u0027Users should wash hands before eating.\u0027 What kind of statement is this?",
        "choices":  [
                        "A WPS rule for agricultural workers",
                        "A cancellation notice from EPA for the older label version",
                        "A recommendation under a heading such as User Safety Recommendations",
                        "A statement of warranty from the manufacturer"
                    ],
        "answer":  2,
        "explanation":  "\u0027Should\u0027 language in User Safety Recommendations advises. \u0027Must\u0027 and \u0027do not\u0027 language is mandatory. Still follow it.",
        "whyNot":  [
                       "WPS rules are a separate federal regulation, not this label sentence.",
                       "Cancellation notices are not printed as safety advice.",
                       null,
                       "Warranty language is in Conditions of Sale, not safety advice."
                   ],
        "source":  "Termidor HE label; [verify vs Core Manual]"
    },
    {
        "id":  "core-038",
        "module":  "labels",
        "difficulty":  2,
        "question":  "What does \u0027Group 2B\u0027 on a label mean?",
        "choices":  [
                        "The insecticide mode-of-action group",
                        "The acute toxicity category of the product",
                        "The state license group for the applicator",
                        "A formulation type"
                    ],
        "answer":  0,
        "explanation":  "The number helps with resistance rotation.",
        "whyNot":  [
                       null,
                       "Toxicity shows in the signal word, not a group number.",
                       "Virginia license categories use numbers like 7A, not label groups.",
                       "Formulations use codes like SC or WP, not group numbers."
                   ],
        "source":  "Termidor HE label"
    },
    {
        "id":  "core-039",
        "module":  "labels",
        "difficulty":  2,
        "question":  "What is the active ingredient?",
        "choices":  [
                        "The company that registered the product",
                        "The solvent that carries the chemical",
                        "The product\u0027s brand name",
                        "The chemical that controls the pest"
                    ],
        "answer":  3,
        "explanation":  "Active ingredients control the pest. Other ingredients carry or assist.",
        "whyNot":  [
                       "The registrant is the company, not the active ingredient.",
                       "The solvent is an other ingredient, not the active.",
                       "The brand name is a trade name, not the active.",
                       null
                   ],
        "source":  "VTPP Quarterly 7(3)"
    },
    {
        "id":  "core-040",
        "module":  "labels",
        "difficulty":  2,
        "question":  "Two products share an active ingredient but have different brand names. What do you do?",
        "choices":  [
                        "Use the lower-cost product\u0027s directions for both of them",
                        "Read each label, since rates and sites can differ",
                        "Follow whichever label has the older date on it",
                        "Use them interchangeably, since the active is the same"
                    ],
        "answer":  1,
        "explanation":  "Similar names and ingredients do not mean the same directions.",
        "whyNot":  [
                       "Each product follows only its own label.",
                       null,
                       "Label age does not decide use. Each label governs its own product.",
                       "Same active does not mean same rates or sites."
                   ],
        "source":  "NPIC Reading Pesticide Labels"
    },
    {
        "id":  "core-041",
        "module":  "labels",
        "difficulty":  1,
        "question":  "Which is true of the label on a job?",
        "choices":  [
                        "It is optional once a tech has used the product for a full year",
                        "The label must be in the user\u0027s possession at application, where the label says so",
                        "It applies to restricted-use products, not to general use",
                        "It can stay at the branch as long as the office has a copy"
                    ],
        "answer":  1,
        "explanation":  "Termidor HE\u0027s directions state that labeling must be in the user\u0027s possession at application.",
        "whyNot":  [
                       "Experience never ends the label requirement.",
                       null,
                       "Label rules apply to general-use products too.",
                       "A copy at the office does not satisfy a rule to have it at the job."
                   ],
        "source":  "Termidor HE label"
    },
    {
        "id":  "core-042",
        "module":  "labels",
        "difficulty":  1,
        "question":  "Pesticide labels commonly carry a statement to keep the product away from:",
        "choices":  [
                        "Children",
                        "Open water",
                        "Direct sunlight",
                        "Metal containers"
                    ],
        "answer":  0,
        "explanation":  "\u0027Keep Out of Reach of Children\u0027 is standard on labels.",
        "whyNot":  [
                       null,
                       "Water warnings vary by product. The child warning is the standard line.",
                       "Sunlight is a storage concern, not the standard keep-away statement.",
                       "Container type is not the standard keep-away statement."
                   ],
        "source":  "Termidor HE label; [verify vs Core Manual]"
    },
    {
        "id":  "core-043",
        "module":  "formulations",
        "difficulty":  1,
        "question":  "What does a true solution do in the tank?",
        "choices":  [
                        "Settles within minutes",
                        "Needs constant shaking until it is sprayed",
                        "Turns into a dust when it dries in the tank",
                        "Stays mixed once dissolved"
                    ],
        "answer":  3,
        "explanation":  "Solutions do not separate even without agitation.",
        "whyNot":  [
                       "Solutions do not settle. Suspensions settle.",
                       "Constant agitation is for suspensions, not dissolved products.",
                       "A solution stays a liquid. It does not turn to dust.",
                       null
                   ],
        "source":  "VTPP Quarterly 7(3)"
    },
    {
        "id":  "core-044",
        "module":  "formulations",
        "difficulty":  1,
        "question":  "What do wettable powders do in a tank?",
        "choices":  [
                        "Form a true solution that stays mixed",
                        "Burn off as vapor",
                        "Form a suspension and need agitation",
                        "Dissolve completely into a clear liquid"
                    ],
        "answer":  2,
        "explanation":  "WPs do not dissolve. They settle out without agitation.",
        "whyNot":  [
                       "That describes a soluble product, not a wettable powder.",
                       "Wettable powders do not turn to vapor in the tank.",
                       null,
                       "Wettable powders do not dissolve. They stay as particles."
                   ],
        "source":  "VTPP Quarterly 7(3)"
    },
    {
        "id":  "core-045",
        "module":  "formulations",
        "difficulty":  1,
        "question":  "What are WDG and DF formulations?",
        "choices":  [
                        "Ready-to-use baits placed in cracks and crevices",
                        "Dry products applied from a rotary spreader",
                        "Dry granules that disperse and need constant agitation",
                        "Granules that dissolve into a clear solution"
                    ],
        "answer":  2,
        "explanation":  "Water-dispersible granules are like compressed wettable powders and form a suspension.",
        "whyNot":  [
                       "Baits are a different formulation.",
                       "Spreader products are dry granules (G), not WDG.",
                       null,
                       "They disperse. They do not dissolve."
                   ],
        "source":  "VTPP Quarterly 7(3)"
    },
    {
        "id":  "core-046",
        "module":  "formulations",
        "difficulty":  2,
        "question":  "How does a dispersible granule compare to a wettable powder?",
        "choices":  [
                        "Higher dust when poured from the bag",
                        "Less need for agitation in the tank",
                        "No effect on pumps, screens or nozzle tips",
                        "Lower inhalation hazard while pouring"
                    ],
        "answer":  3,
        "explanation":  "WDGs reduce inhalation hazard and pour easily, but still need agitation and can be hard on equipment.",
        "whyNot":  [
                       "Granules make less dust, not more.",
                       "Both still need constant agitation.",
                       "VTPP notes WDGs can be hard on equipment.",
                       null
                   ],
        "source":  "VTPP Quarterly 7(3)"
    },
    {
        "id":  "core-047",
        "module":  "formulations",
        "difficulty":  2,
        "question":  "Your spray tank looks milky. What is it most likely?",
        "choices":  [
                        "An emulsion",
                        "A true solution",
                        "A dust",
                        "A pellet"
                    ],
        "answer":  0,
        "explanation":  "Emulsions look cloudy or milky.",
        "whyNot":  [
                       null,
                       "True solutions are clear, not milky.",
                       "Dusts are applied dry, not in a tank.",
                       "Pellets are applied dry, not in a tank."
                   ],
        "source":  "VTPP Quarterly 7(3)"
    },
    {
        "id":  "core-048",
        "module":  "formulations",
        "difficulty":  2,
        "question":  "Which product is never mixed with water?",
        "choices":  [
                        "A water-dispersible granule",
                        "A dust",
                        "A wettable powder",
                        "A soluble powder"
                    ],
        "answer":  1,
        "explanation":  "Dusts are ready to use and always applied dry.",
        "whyNot":  [
                       "Dispersible granules are mixed with water.",
                       null,
                       "Wettable powders are made to mix with water.",
                       "Soluble powders dissolve in water for spraying."
                   ],
        "source":  "VTPP Quarterly 7(3)"
    },
    {
        "id":  "core-049",
        "module":  "formulations",
        "difficulty":  2,
        "question":  "How does a \u0027G\u0027 product differ from a \u0027WG\u0027 product?",
        "choices":  [
                        "Applied dry, while WG is mixed in water",
                        "Mixed in water, while WG is applied dry",
                        "A gas that is released in a sealed space",
                        "A liquid sold in a small concentrate jug"
                    ],
        "answer":  0,
        "explanation":  "Granules are ready to use and applied dry. WG is mixed with water to form a suspension.",
        "whyNot":  [
                       null,
                       "That is backwards. G goes on dry. WG goes in water.",
                       "Gases are fumigants, not G granules.",
                       "G products are dry, not liquids."
                   ],
        "source":  "VTPP Quarterly 7(3)"
    },
    {
        "id":  "core-050",
        "module":  "formulations",
        "difficulty":  2,
        "question":  "What is the main hazard of dust formulations?",
        "choices":  [
                        "Plant burn from solvents",
                        "Foaming",
                        "Inhalation and drift",
                        "Tank corrosion"
                    ],
        "answer":  2,
        "explanation":  "Dusts carry a high inhalation and drift hazard.",
        "whyNot":  [
                       "Dusts are not solvent-based liquids.",
                       "Foaming is a tank-mix issue, not a dust hazard.",
                       null,
                       "Dusts are not mixed in tanks."
                   ],
        "source":  "VTPP Quarterly 7(3)"
    },
    {
        "id":  "core-051",
        "module":  "formulations",
        "difficulty":  3,
        "question":  "A water-soluble packet dissolves in the tank. What do you conclude?",
        "choices":  [
                        "The film was the active ingredient, so the mix is done",
                        "Read the label; the contents inside may still only disperse",
                        "The mix is now a true solution, so stop agitating",
                        "The powder turns to dust and must be strained out"
                    ],
        "answer":  1,
        "explanation":  "The packet film dissolves. That says nothing about how the powder inside behaves.",
        "whyNot":  [
                       "The film is the bag. The active is inside it.",
                       null,
                       "The packet film dissolving says nothing about the powder inside.",
                       "The contents stay in the tank. Nothing is strained out."
                   ],
        "source":  "UF/IFAS Mixologist 2024; imidacloprid WSP labels [verify current label]"
    },
    {
        "id":  "core-052",
        "module":  "formulations",
        "difficulty":  3,
        "question":  "Why keep gloves dry when handling water-soluble packets?",
        "choices":  [
                        "OSHA requires dry gloves when handling any pesticide product",
                        "Wet gloves can change the product\u0027s signal word",
                        "Water on the glove can corrode the tank and the pump",
                        "Moisture can start to dissolve the packet and expose the contents"
                    ],
        "answer":  3,
        "explanation":  "WSP labels warn against handling packets with wet hands or gloves.",
        "whyNot":  [
                       "Dry gloves come from the WSP label, not a general OSHA rule.",
                       "Moisture does not change a signal word.",
                       "The concern is the packet opening, not tank corrosion.",
                       null
                   ],
        "source":  "Imidacloprid WSP EPA labels [verify current label]"
    },
    {
        "id":  "core-053",
        "module":  "formulations",
        "difficulty":  2,
        "question":  "Why are carelessly placed baits a risk?",
        "choices":  [
                        "They release vapor that builds up in rooms",
                        "They corrode metal near where they are placed",
                        "They settle unless they are kept agitated",
                        "Children and pets may find them attractive"
                    ],
        "answer":  3,
        "explanation":  "Baits can be attractive to nontargets, so placement matters.",
        "whyNot":  [
                       "Baits are not volatile vapor sources.",
                       "Baits do not corrode metal.",
                       "Baits are not mixed in tanks.",
                       null
                   ],
        "source":  "VTPP Quarterly 7(3)"
    },
    {
        "id":  "core-054",
        "module":  "formulations",
        "difficulty":  3,
        "question":  "A mixing section says \u0027until completely dispersed.\u0027 What does that tell you?",
        "choices":  [
                        "The product is ready to use from the bottle",
                        "The product forms a suspension rather than dissolving",
                        "The product dissolves into a true solution",
                        "The product is a dust that needs no water"
                    ],
        "answer":  1,
        "explanation":  "Dispersed solids remain particles. Termidor HE, a suspension concentrate, uses this language.",
        "whyNot":  [
                       "A product you mix is not ready to use as sold.",
                       null,
                       "Dispersed means it stays as particles, not a solution.",
                       "Dusts are not mixed into a tank."
                   ],
        "source":  "Termidor HE label"
    },
    {
        "id":  "core-055",
        "module":  "moa-resistance",
        "difficulty":  1,
        "question":  "What does a selective herbicide do?",
        "choices":  [
                        "Controls some plants while leaving others",
                        "Kills most green plants it touches",
                        "Works on insects rather than on plants or weeds",
                        "Stays put at the spot where it lands"
                    ],
        "answer":  0,
        "explanation":  "Selective affects target plants. Non-selective affects most plants.",
        "whyNot":  [
                       null,
                       "That describes a non-selective herbicide.",
                       "Herbicides target plants, not insects.",
                       "Selective is about which plants it affects, not movement."
                   ],
        "source":  "General pesticide knowledge [verify vs Core Manual]"
    },
    {
        "id":  "core-056",
        "module":  "moa-resistance",
        "difficulty":  1,
        "question":  "When is a pre-emergent herbicide applied?",
        "choices":  [
                        "After weeds flower and set seed",
                        "Once weeds are up and growing",
                        "Before weeds sprout",
                        "To tree trunks in late winter"
                    ],
        "answer":  2,
        "explanation":  "Pre-emergent stops weeds before they appear; post-emergent targets existing weeds.",
        "whyNot":  [
                       "After flowering is far too late for a pre-emergent.",
                       "Weeds already up need a post-emergent.",
                       null,
                       "Pre-emergents target sprouting weed seeds, not tree trunks."
                   ],
        "source":  "Ninefold weed control page; general knowledge [verify vs Core Manual]"
    },
    {
        "id":  "core-057",
        "module":  "moa-resistance",
        "difficulty":  2,
        "question":  "How does an insect growth regulator work?",
        "choices":  [
                        "Attracting predators",
                        "Disrupting normal development",
                        "Burning the cuticle at contact",
                        "Drying the air"
                    ],
        "answer":  1,
        "explanation":  "IGRs interfere with development rather than giving quick knockdown.",
        "whyNot":  [
                       "IGRs do not attract predators.",
                       null,
                       "Burning on contact is not how IGRs work.",
                       "IGRs act on insects, not on the air."
                   ],
        "source":  "General knowledge [verify vs Core Manual]"
    },
    {
        "id":  "core-058",
        "module":  "moa-resistance",
        "difficulty":  2,
        "question":  "What is pesticide resistance?",
        "choices":  [
                        "One insect slowly getting used to a chemical over its own life",
                        "A product going bad in storage so that it stops killing pests",
                        "A label change that lowers the rate allowed for a pest",
                        "A population\u0027s inherited ability to survive doses that once worked"
                    ],
        "answer":  3,
        "explanation":  "Selection pressure raises the share of resistant individuals across generations.",
        "whyNot":  [
                       "Resistance is inherited across a population, not learned by one insect.",
                       "Spoiled product is a storage problem, not resistance.",
                       "A label change does not create resistance.",
                       null
                   ],
        "source":  "Pesticide Environmental Stewardship, Resistance"
    },
    {
        "id":  "core-059",
        "module":  "moa-resistance",
        "difficulty":  2,
        "question":  "What should you rotate to slow resistance?",
        "choices":  [
                        "Truck routes",
                        "Container sizes",
                        "Mode-of-action groups",
                        "Brand names with the same group"
                    ],
        "answer":  2,
        "explanation":  "Rotate by group number; different brands can share a mode of action.",
        "whyNot":  [
                       "Routes have nothing to do with resistance.",
                       "Container size has nothing to do with resistance.",
                       null,
                       "Different brands can share the same group."
                   ],
        "source":  "Pesticide Environmental Stewardship, Resistance"
    },
    {
        "id":  "core-060",
        "module":  "moa-resistance",
        "difficulty":  2,
        "question":  "What can happen if you apply less than the label rate to save money?",
        "choices":  [
                        "May select for resistance and may violate the label",
                        "Slows resistance by leaving less chemical behind",
                        "Improves residual because less product breaks down",
                        "Is allowed for any pest, at any site, on any label"
                    ],
        "answer":  0,
        "explanation":  "Under-dosing leaves survivors, and some labels, such as Termidor HE, forbid lower rates.",
        "whyNot":  [
                       null,
                       "Lower doses can leave survivors and speed resistance.",
                       "Lower rates do not improve residual.",
                       "Some labels forbid lower rates. Termidor HE is one."
                   ],
        "source":  "Termidor HE label; [verify vs Core Manual]"
    },
    {
        "id":  "core-061",
        "module":  "moa-resistance",
        "difficulty":  2,
        "question":  "How do insects react to a non-repellent insecticide?",
        "choices":  [
                        "Can smell it from far away",
                        "Become resistant at once",
                        "Do not avoid it",
                        "Run from it"
                    ],
        "answer":  2,
        "explanation":  "Non-repellents are not detected and avoided in the same way.",
        "whyNot":  [
                       "Non-repellents are not detected and avoided.",
                       "Resistance builds over generations, not at once.",
                       null,
                       "Running from it describes a repellent."
                   ],
        "source":  "Termidor HE product information; UF and UK research"
    },
    {
        "id":  "core-062",
        "module":  "moa-resistance",
        "difficulty":  1,
        "question":  "Why identify a pest before treatment?",
        "choices":  [
                        "Control choices depend on the species",
                        "The customer wants a name on the record",
                        "The label requires a photo of the pest",
                        "It sets the length of the warranty period"
                    ],
        "answer":  0,
        "explanation":  "IPM starts with accurate ID.",
        "whyNot":  [
                       null,
                       "A name on the record is not the reason.",
                       "Labels do not require a photo.",
                       "ID guides control, not warranty length."
                   ],
        "source":  "EPA IPM Principles"
    },
    {
        "id":  "core-063",
        "module":  "ipm",
        "difficulty":  1,
        "question":  "IPM stands for:",
        "choices":  [
                        "Insect Prevention Method",
                        "Interior Pesticide Mixing",
                        "Inspection, Protection, Monitoring",
                        "Integrated Pest Management"
                    ],
        "answer":  3,
        "explanation":  "Integrated Pest Management.",
        "whyNot":  [
                       "IPM covers all pests, not just insects, and is more than one method.",
                       "IPM is not about mixing products indoors.",
                       "Those are steps in a service, not what IPM stands for.",
                       null
                   ],
        "source":  "EPA IPM Principles"
    },
    {
        "id":  "core-064",
        "module":  "ipm",
        "difficulty":  1,
        "question":  "Which is a core IPM idea?",
        "choices":  [
                        "Start with the strongest labeled product, then add other tactics later",
                        "Use several tactics, based on monitoring, and take action only when justified",
                        "Rely on sanitation and leave pesticides out of the plan",
                        "Spray on a set schedule whether or not pests are found at the site"
                    ],
        "answer":  1,
        "explanation":  "IPM combines tactics and uses thresholds. It does not ban pesticides.",
        "whyNot":  [
                       "IPM chooses tactics by need, not strongest first.",
                       null,
                       "IPM may use pesticides when justified.",
                       "IPM uses monitoring and thresholds, not a fixed schedule."
                   ],
        "source":  "EPA IPM Principles"
    },
    {
        "id":  "core-065",
        "module":  "ipm",
        "difficulty":  1,
        "question":  "What is an action threshold?",
        "choices":  [
                        "The maximum pressure a sprayer should reach",
                        "The pest level at which control is justified",
                        "The legal limit of finished mix a tank can hold",
                        "The doorway or gap a pest uses to enter a building"
                    ],
        "answer":  1,
        "explanation":  "Thresholds tell you when to act.",
        "whyNot":  [
                       "Sprayer pressure is unrelated.",
                       null,
                       "A tank\u0027s capacity is unrelated.",
                       "An entry point is a gap, not a threshold."
                   ],
        "source":  "EPA IPM Principles"
    },
    {
        "id":  "core-066",
        "module":  "ipm",
        "difficulty":  2,
        "question":  "What type of control is sealing a gap under a door to stop mice?",
        "choices":  [
                        "Physical or mechanical exclusion",
                        "Cultural control through sanitation and cleaning",
                        "Chemical control",
                        "Biological control with natural enemies"
                    ],
        "answer":  0,
        "explanation":  "Exclusion is physical control.",
        "whyNot":  [
                       null,
                       "Sanitation removes food and water. Sealing blocks entry.",
                       "No pesticide is used in sealing a gap.",
                       "Biological control uses living organisms."
                   ],
        "source":  "VDH Rats and Mice; [verify vs Core Manual]"
    },
    {
        "id":  "core-067",
        "module":  "ipm",
        "difficulty":  1,
        "question":  "What tactic is removing food and cleaning a kitchen?",
        "choices":  [
                        "Monitoring with traps",
                        "Bait placement",
                        "Fumigation",
                        "Sanitation"
                    ],
        "answer":  3,
        "explanation":  "Sanitation removes food and water.",
        "whyNot":  [
                       "Traps monitor pests. Cleaning removes their food.",
                       "Baiting uses a pesticide product.",
                       "Fumigation uses a gas pesticide.",
                       null
                   ],
        "source":  "VDH Rats and Mice; EPA IPM"
    },
    {
        "id":  "core-068",
        "module":  "ipm",
        "difficulty":  2,
        "question":  "What is a monitoring trap for?",
        "choices":  [
                        "To apply a pesticide to the pests it catches",
                        "To eliminate the whole colony in one visit",
                        "To show pest presence and activity levels",
                        "To replace a full inspection of the site"
                    ],
        "answer":  2,
        "explanation":  "Monitoring gives data for decisions.",
        "whyNot":  [
                       "Monitoring traps catch insects. They do not apply pesticide.",
                       "Monitoring tracks pests. It does not wipe out a colony.",
                       null,
                       "Traps support an inspection. They do not replace it."
                   ],
        "source":  "EPA IPM Principles"
    },
    {
        "id":  "core-069",
        "module":  "ipm",
        "difficulty":  2,
        "question":  "About how small an opening can a mouse use?",
        "choices":  [
                        "2 inches",
                        "3 inches",
                        "1/4 inch",
                        "1 inch"
                    ],
        "answer":  2,
        "explanation":  "VDH says mice need only a 1/4-inch opening and rats a 1/2-inch opening.",
        "whyNot":  [
                       "2 inches is far bigger than a mouse needs.",
                       "3 inches is far bigger than a mouse needs.",
                       null,
                       "1 inch is much bigger than the 1/4 inch a mouse needs."
                   ],
        "source":  "VDH Rats and Mice"
    },
    {
        "id":  "core-070",
        "module":  "ipm",
        "difficulty":  2,
        "question":  "Which is an example of biological control?",
        "choices":  [
                        "Caulking a window to block entry",
                        "Applying a dust in a wall void",
                        "Setting snap traps along a wall line",
                        "Natural enemies suppressing a pest"
                    ],
        "answer":  3,
        "explanation":  "Biological control uses living organisms.",
        "whyNot":  [
                       "Caulking is physical exclusion.",
                       "A dust is chemical control.",
                       "Traps are mechanical control.",
                       null
                   ],
        "source":  "General knowledge [verify vs Core Manual]"
    },
    {
        "id":  "core-071",
        "module":  "toxicity",
        "difficulty":  1,
        "question":  "Which formula best describes pesticide risk?",
        "choices":  [
                        "Toxicity times exposure",
                        "Toxicity minus the PPE worn",
                        "Product cost times tank volume",
                        "Rate divided by treated area"
                    ],
        "answer":  0,
        "explanation":  "Risk depends on how toxic it is and how much exposure occurs.",
        "whyNot":  [
                       null,
                       "PPE reduces exposure. It is not subtracted from toxicity.",
                       "Cost and volume do not measure risk.",
                       "That is an application rate, not risk."
                   ],
        "source":  "Pesticide Environmental Stewardship, Hazard-Toxicity-Exposure"
    },
    {
        "id":  "core-072",
        "module":  "toxicity",
        "difficulty":  1,
        "question":  "What are the four routes of pesticide exposure?",
        "choices":  [
                        "Skin, hair, nails, teeth",
                        "Dermal, ocular, inhalation, ingestion",
                        "Dermal, hearing, inhalation, ingestion",
                        "Oral, nasal, visual, chemical"
                    ],
        "answer":  1,
        "explanation":  "VT lists dermal, ocular, inhalation and ingestion.",
        "whyNot":  [
                       "Hair, nails and teeth are not the four routes.",
                       null,
                       "Hearing is not a route of exposure.",
                       "Visual and chemical are not exposure routes."
                   ],
        "source":  "VT ENTO-611"
    },
    {
        "id":  "core-073",
        "module":  "toxicity",
        "difficulty":  1,
        "question":  "What does LD50 mean?",
        "choices":  [
                        "Kills 50% of test animals",
                        "Kills 100% of target pests",
                        "Is safe for 50% of humans",
                        "Causes 50% of cancers"
                    ],
        "answer":  0,
        "explanation":  "LD50 is lethal dose to half the test group.",
        "whyNot":  [
                       null,
                       "LD50 is measured on test animals, not target pests.",
                       "LD50 is about lethal dose, not a safe dose.",
                       "LD50 measures death, not cancer."
                   ],
        "source":  "NPIC fact sheets"
    },
    {
        "id":  "core-074",
        "module":  "toxicity",
        "difficulty":  1,
        "question":  "Which LD50 shows the most toxic product?",
        "choices":  [
                        "1,000 mg/kg",
                        "5,000 mg/kg",
                        "10 mg/kg",
                        "100 mg/kg"
                    ],
        "answer":  2,
        "explanation":  "Lower LD50 means less is needed, so it is more toxic.",
        "whyNot":  [
                       "1,000 mg/kg is less toxic than 10 mg/kg.",
                       "5,000 mg/kg is low toxicity.",
                       null,
                       "100 mg/kg needs more product to kill than 10 mg/kg."
                   ],
        "source":  "NPIC Signal Words"
    },
    {
        "id":  "core-075",
        "module":  "toxicity",
        "difficulty":  2,
        "question":  "What does LC50 measure that LD50 does not?",
        "choices":  [
                        "Lower cost than an LD50 test",
                        "Concentration, as in air or water",
                        "Long-term cancer risk in lab animals",
                        "The label category for that product"
                    ],
        "answer":  1,
        "explanation":  "LC50 is lethal concentration.",
        "whyNot":  [
                       "LC50 is not about cost.",
                       null,
                       "LC50 measures lethal concentration, not cancer risk.",
                       "LC50 is a test value, not a label category."
                   ],
        "source":  "NPIC fact sheets"
    },
    {
        "id":  "core-076",
        "module":  "toxicity",
        "difficulty":  2,
        "question":  "What does LD50 not tell you?",
        "choices":  [
                        "Lethal dose in test animals",
                        "Relative acute toxicity of a chemical",
                        "The dose tied to half the test group",
                        "Long-term effects such as cancer"
                    ],
        "answer":  3,
        "explanation":  "LD50 reflects short-term lethality only.",
        "whyNot":  [
                       "LD50 is the lethal dose in test animals.",
                       "LD50 does compare acute toxicity.",
                       "LD50 is the dose that kills half the test group.",
                       null
                   ],
        "source":  "NPIC fact sheets"
    },
    {
        "id":  "core-078",
        "module":  "toxicity",
        "difficulty":  1,
        "question":  "What should go to the doctor with a poisoned person?",
        "choices":  [
                        "The empty sprayer wand",
                        "The product label",
                        "The truck\u0027s service log",
                        "The customer\u0027s invoice"
                    ],
        "answer":  1,
        "explanation":  "Labels give medical staff the product identity and treatment notes.",
        "whyNot":  [
                       "The sprayer does not give the doctor product information.",
                       null,
                       "A service log does not tell doctors what the chemical is.",
                       "An invoice may not show the product\u0027s hazards."
                   ],
        "source":  "Termidor HE label; VT ENTO-611"
    },
    {
        "id":  "core-079",
        "module":  "toxicity",
        "difficulty":  2,
        "question":  "Concentrate splashes in your eye. How long do typical labels say to rinse?",
        "choices":  [
                        "15 to 20 minutes",
                        "30 seconds",
                        "2 minutes",
                        "1 hour"
                    ],
        "answer":  0,
        "explanation":  "Termidor HE first aid says 15 to 20 minutes. Check the product\u0027s label.",
        "whyNot":  [
                       null,
                       "30 seconds is far too short.",
                       "2 minutes is too short.",
                       "1 hour is longer than labels state."
                   ],
        "source":  "Termidor HE label"
    },
    {
        "id":  "core-080",
        "module":  "toxicity",
        "difficulty":  2,
        "question":  "Someone swallowed a pesticide. Unless told otherwise, what do you do?",
        "choices":  [
                        "Give milk automatically",
                        "Give anything by mouth, even if unconscious",
                        "Not induce vomiting",
                        "Induce vomiting right away"
                    ],
        "answer":  2,
        "explanation":  "Labels commonly direct calling first and not inducing vomiting unless told. Nothing by mouth if unconscious.",
        "whyNot":  [
                       "Labels do not direct giving milk.",
                       "Never give anything by mouth to an unconscious person.",
                       null,
                       "Labels say not to induce vomiting unless told to."
                   ],
        "source":  "Termidor HE label"
    },
    {
        "id":  "core-081",
        "module":  "toxicity",
        "difficulty":  3,
        "question":  "A tech in full PPE on a hot day has a headache, nausea and dizziness. What do you do?",
        "choices":  [
                        "Finish the job first, then rest in the shade and call the office",
                        "Stop work, leave the area, and seek medical attention; heat and pesticide signs overlap",
                        "Treat it as heat, keep the PPE on, and drink water while finishing",
                        "Take off the PPE, rest ten minutes, and go back to spraying"
                    ],
        "answer":  1,
        "explanation":  "VT says the two conditions share signs. Stop work and seek medical attention if either is suspected.",
        "whyNot":  [
                       "Work must stop first. Get help now.",
                       null,
                       "Pesticide exposure looks like heat stress. Do not assume or keep working.",
                       "Rest alone does not rule out poisoning."
                   ],
        "source":  "VT ENTO-611"
    },
    {
        "id":  "core-082",
        "module":  "toxicity",
        "difficulty":  3,
        "question":  "Organophosphate and carbamate poisoning involve which enzyme?",
        "choices":  [
                        "Carbonic anhydrase",
                        "Lactate dehydrogenase",
                        "Pepsin",
                        "Cholinesterase"
                    ],
        "answer":  3,
        "explanation":  "Both inhibit cholinesterase, a key nerve enzyme.",
        "whyNot":  [
                       "Carbonic anhydrase is not the enzyme these insecticides block.",
                       "Lactate dehydrogenase is not tied to this kind of poisoning.",
                       "Pepsin is a stomach enzyme, not the nerve enzyme involved.",
                       null
                   ],
        "source":  "EPA Recognition and Management of Pesticide Poisonings [verify vs Core Manual]"
    },
    {
        "id":  "core-083",
        "module":  "toxicity",
        "difficulty":  2,
        "question":  "What does Termidor HE\u0027s Note to Physician say about antidotes?",
        "choices":  [
                        "Vitamin K must be given first",
                        "Give activated charcoal at the job site",
                        "There is no specific antidote",
                        "Atropine must be given first"
                    ],
        "answer":  2,
        "explanation":  "The note says treatment is based on signs and symptoms.",
        "whyNot":  [
                       "Vitamin K is for some rodenticides, not fipronil.",
                       "The note does not call for field treatment like this.",
                       null,
                       "The note does not name atropine."
                   ],
        "source":  "Termidor HE label"
    },
    {
        "id":  "core-084",
        "module":  "ppe",
        "difficulty":  1,
        "question":  "What sets the minimum PPE for a job?",
        "choices":  [
                        "The product label",
                        "The customer\u0027s request",
                        "The day\u0027s weather forecast",
                        "The crew\u0027s usual habit"
                    ],
        "answer":  0,
        "explanation":  "The label lists required PPE.",
        "whyNot":  [
                       null,
                       "Customers cannot set less PPE than the label.",
                       "Weather does not change label PPE.",
                       "Habit does not set the legal minimum."
                   ],
        "source":  "Termidor HE label"
    },
    {
        "id":  "core-085",
        "module":  "ppe",
        "difficulty":  2,
        "question":  "You rod soil in an open yard with Termidor HE. What extra PPE does the label require?",
        "choices":  [
                        "A fall harness",
                        "A self-contained breathing unit",
                        "Protective eyewear",
                        "A full body suit"
                    ],
        "answer":  2,
        "explanation":  "Eyewear is required in non-ventilated spaces or when rodding or sub-slab injecting.",
        "whyNot":  [
                       "Fall harnesses are not pesticide PPE.",
                       "The label does not list a breathing unit for this work.",
                       null,
                       "A full body suit is not listed for this."
                   ],
        "source":  "Termidor HE label"
    },
    {
        "id":  "core-086",
        "module":  "ppe",
        "difficulty":  2,
        "question":  "You work in a crawl space with Termidor HE. What extra PPE does the label require?",
        "choices":  [
                        "A NIOSH-approved particulate respirator and protective eyewear",
                        "A cotton mask and a pair of leather gloves for the crawl",
                        "A face shield and rubber boots, in place of a respirator",
                        "Nothing extra, since the work is done at soil level"
                    ],
        "answer":  0,
        "explanation":  "Non-ventilated spaces, including crawl spaces, trigger both.",
        "whyNot":  [
                       null,
                       "A cotton mask is not a NIOSH respirator.",
                       "A face shield does not replace the respirator.",
                       "Crawl spaces are non-ventilated. The label adds respirator and eyewear."
                   ],
        "source":  "Termidor HE label"
    },
    {
        "id":  "core-087",
        "module":  "ppe",
        "difficulty":  1,
        "question":  "When removing contaminated gloves, what comes first?",
        "choices":  [
                        "Touch your face to check",
                        "Take them off and store them inside out, unwashed",
                        "Wipe them on your shirt",
                        "Wash the outside of the gloves"
                    ],
        "answer":  3,
        "explanation":  "Wash the outside of gloves before removing.",
        "whyNot":  [
                       "Touching your face spreads pesticide.",
                       "Gloves are washed before removal.",
                       "Wiping on your shirt contaminates your clothes.",
                       null
                   ],
        "source":  "Termidor HE label"
    },
    {
        "id":  "core-088",
        "module":  "ppe",
        "difficulty":  1,
        "question":  "How should PPE be laundered?",
        "choices":  [
                        "Not at all, because used PPE goes in the household trash",
                        "Separately from other laundry, with detergent and hot water unless told otherwise",
                        "With family clothes, on a normal cycle, using regular detergent",
                        "In cold water with bleach, along with other work clothes"
                    ],
        "answer":  1,
        "explanation":  "Keep and wash PPE separately. Follow the manufacturer\u0027s instructions.",
        "whyNot":  [
                       "Washable PPE is laundered. Disposal follows the label.",
                       null,
                       "Keep PPE separate from family laundry.",
                       "Labels say hot water and detergent unless told otherwise."
                   ],
        "source":  "Termidor HE label"
    },
    {
        "id":  "core-089",
        "module":  "ppe",
        "difficulty":  2,
        "question":  "Pesticide gets inside your gloves. What do you do?",
        "choices":  [
                        "Pull a new pair of gloves on over the ones you have on",
                        "Remove them right away, wash thoroughly, and put on clean items",
                        "Rinse the outside of the gloves and keep on working",
                        "Finish the row, then wash up at the end of the job"
                    ],
        "answer":  1,
        "explanation":  "Labels say to remove clothing or PPE immediately if pesticide gets inside.",
        "whyNot":  [
                       "Another pair traps the pesticide against your skin.",
                       null,
                       "Rinsing the outside leaves pesticide on your skin.",
                       "Waiting keeps pesticide on your skin."
                   ],
        "source":  "Termidor HE label"
    },
    {
        "id":  "core-090",
        "module":  "ppe",
        "difficulty":  2,
        "question":  "Why schedule heavy PPE work for cooler hours?",
        "choices":  [
                        "PPE traps heat and raises heat stress risk",
                        "It changes the pesticide\u0027s signal word for the day",
                        "Labels require evening work",
                        "Gloves break down faster in daylight than in shade"
                    ],
        "answer":  0,
        "explanation":  "VT says non-breathable PPE can increase heat-related illness risk.",
        "whyNot":  [
                       null,
                       "Signal words do not change by time of day.",
                       "Labels do not require evening work.",
                       "The reason is heat stress, not glove wear."
                   ],
        "source":  "VT ENTO-611"
    },
    {
        "id":  "core-091",
        "module":  "ppe",
        "difficulty":  2,
        "question":  "What unit does Termidor HE use for glove thickness?",
        "choices":  [
                        "Inches of rubber",
                        "Millimeters of leather",
                        "Ounces",
                        "Mils"
                    ],
        "answer":  3,
        "explanation":  "The label lists materials at 14 mils or more for several types.",
        "whyNot":  [
                       "Glove thickness is given in mils, not inches.",
                       "The label lists rubber and plastic types, not leather.",
                       "Ounces measure weight or volume, not thickness.",
                       null
                   ],
        "source":  "Termidor HE label"
    },
    {
        "id":  "core-092",
        "module":  "handling",
        "difficulty":  1,
        "question":  "Why use a backflow device or air gap when filling a tank?",
        "choices":  [
                        "To cut down on noise from the pump at the site",
                        "To speed up filling at the job site",
                        "To keep pesticide from siphoning into the water source",
                        "To raise water pressure at the spray nozzle"
                    ],
        "answer":  2,
        "explanation":  "Virginia rules and labels require backflow protection.",
        "whyNot":  [
                       "Noise is not the reason.",
                       "Speed is not the reason.",
                       null,
                       "Backflow devices do not raise nozzle pressure."
                   ],
        "source":  "2VAC5-670-170; Termidor HE label"
    },
    {
        "id":  "core-093",
        "module":  "handling",
        "difficulty":  1,
        "question":  "Where should pesticides never ride?",
        "choices":  [
                        "In a secured tank in the truck bed",
                        "In a locked box on the truck",
                        "In the passenger compartment",
                        "In a lidded tote in the truck bed"
                    ],
        "answer":  2,
        "explanation":  "Never carry pesticides in the passenger compartment.",
        "whyNot":  [
                       "A secured tank in the bed is an acceptable way to carry them.",
                       "A locked box on the truck keeps them secure and out of the cab.",
                       null,
                       "A lidded tote in the truck bed is an acceptable way to carry them."
                   ],
        "source":  "Pesticide Environmental Stewardship, Vehicle Safety"
    },
    {
        "id":  "core-094",
        "module":  "handling",
        "difficulty":  1,
        "question":  "What must pesticides never travel with?",
        "choices":  [
                        "A labeled spill kit",
                        "Clean PPE and gloves",
                        "Bags of absorbent",
                        "Food or feed"
                    ],
        "answer":  3,
        "explanation":  "Never transport pesticides with food, feed or consumer goods.",
        "whyNot":  [
                       "A spill kit belongs on the truck.",
                       "PPE should be carried for spills.",
                       "Absorbent is part of spill readiness.",
                       null
                   ],
        "source":  "Pesticide Environmental Stewardship; 2VAC5-670-150"
    },
    {
        "id":  "core-095",
        "module":  "handling",
        "difficulty":  2,
        "question":  "With no label limit, what is the rule-of-thumb storage range?",
        "choices":  [
                        "40 to 100°F",
                        "0 to 32°F",
                        "32 to 150°F",
                        "100 to 140°F"
                    ],
        "answer":  0,
        "explanation":  "Labels control, but this is the stewardship rule of thumb.",
        "whyNot":  [
                       null,
                       "Freezing can crack containers.",
                       "150°F is far too hot.",
                       "High heat can damage products and containers."
                   ],
        "source":  "Pesticide Environmental Stewardship, Storage Conditions"
    },
    {
        "id":  "core-096",
        "module":  "handling",
        "difficulty":  2,
        "question":  "What can freezing do to a liquid product?",
        "choices":  [
                        "Turn it into a dust that can be applied as is",
                        "Crack the container or separate the product",
                        "Improve its residual once it warms back up",
                        "Raise its signal word by one toxicity category"
                    ],
        "answer":  1,
        "explanation":  "Freezing may crack containers and cause separation.",
        "whyNot":  [
                       "A liquid does not turn into a usable dust.",
                       null,
                       "Freezing does not improve residual.",
                       "Signal words do not change with temperature."
                   ],
        "source":  "Pesticide Environmental Stewardship, Storage Conditions"
    },
    {
        "id":  "core-097",
        "module":  "handling",
        "difficulty":  2,
        "question":  "What is high storage humidity mainly a problem for?",
        "choices":  [
                        "Dry formulations, which can cake or clump",
                        "Metal shelves",
                        "Labels on glass bottles in a dark cabinet",
                        "Emulsifiable liquids in sealed plastic jugs"
                    ],
        "answer":  0,
        "explanation":  "Humidity can cake dry products and weaken paper containers.",
        "whyNot":  [
                       null,
                       "Humidity can rust metal, but dry products caking is the main issue.",
                       "Labels can peel, but caking dry products is the main issue.",
                       "Sealed liquids are less affected than dry products."
                   ],
        "source":  "Pesticide Environmental Stewardship, Storage Conditions"
    },
    {
        "id":  "core-098",
        "module":  "handling",
        "difficulty":  2,
        "question":  "Why keep pesticides out of direct sunlight in storage?",
        "choices":  [
                        "Sunlight changes EPA numbers",
                        "Sunlight kills pests in the jug",
                        "Sunlight may break them down",
                        "Sunlight raises legal rates"
                    ],
        "answer":  2,
        "explanation":  "Sunlight may cause breakdown.",
        "whyNot":  [
                       "EPA numbers never change from sunlight.",
                       "Sunlight does not do pest work in a jug.",
                       null,
                       "Rates are set by the label, not sunlight."
                   ],
        "source":  "Pesticide Environmental Stewardship, Storage Conditions"
    },
    {
        "id":  "core-099",
        "module":  "handling",
        "difficulty":  2,
        "question":  "With no label mixing order, what is a common fallback?",
        "choices":  [
                        "Whichever product is closest to the tank, mixed in any order you like",
                        "A sequence such as WALES, in which dispersible dry products go before liquids and surfactants go last",
                        "Fill the tank fully first, then add powders last while it sits",
                        "Surfactants first, then powders, then any liquid products left"
                    ],
        "answer":  1,
        "explanation":  "VT says the label often gives the order; WALES is a fallback.",
        "whyNot":  [
                       "Order matters to prevent mixing problems.",
                       null,
                       "Powders go in early, with water, not last.",
                       "Surfactants go in last, not first."
                   ],
        "source":  "Virginia Tech BSE-351 (search summary); UF/IFAS 2024"
    },
    {
        "id":  "core-100",
        "module":  "handling",
        "difficulty":  2,
        "question":  "Before a new tank mix, what is the safest check?",
        "choices":  [
                        "Spray a test patch on the customer\u0027s wall",
                        "Mix a small batch in the sun to see it react",
                        "Ask another tech what has worked before",
                        "Read both labels and run a jar test"
                    ],
        "answer":  3,
        "explanation":  "Extension advises label checks and jar tests for new combinations.",
        "whyNot":  [
                       "Testing on a customer\u0027s wall is not a compatibility test.",
                       "Heat is not a test method.",
                       "Advice does not replace the labels and a jar test.",
                       null
                   ],
        "source":  "UF/IFAS Mixologist 2024"
    },
    {
        "id":  "core-101",
        "module":  "handling",
        "difficulty":  2,
        "question":  "A suspension sat in a backpack for ten minutes. What do you do?",
        "choices":  [
                        "Spray it as is",
                        "Add more concentrate to make up for settling",
                        "Let it sit longer so the solids can dissolve",
                        "Re-agitate until uniform before spraying"
                    ],
        "answer":  3,
        "explanation":  "Suspensions separate without agitation. Settling means uneven dose.",
        "whyNot":  [
                       "Settled solids give an uneven dose.",
                       "Adding concentrate raises the rate above label.",
                       "Suspensions do not dissolve with time.",
                       null
                   ],
        "source":  "VTPP Quarterly 7(3)"
    },
    {
        "id":  "core-102",
        "module":  "handling",
        "difficulty":  1,
        "question":  "What do Virginia rules require of application equipment?",
        "choices":  [
                        "Marked in red with the business license number",
                        "Leakproof and in sound mechanical condition",
                        "Owned by the applicator named on the license",
                        "New each year"
                    ],
        "answer":  1,
        "explanation":  "Regulation sets condition and leak requirements.",
        "whyNot":  [
                       "No color or marking rule exists for this.",
                       null,
                       "Ownership is not part of the equipment rule.",
                       "Equipment can be any age if sound and leakproof."
                   ],
        "source":  "2VAC5-670-170"
    },
    {
        "id":  "core-103",
        "module":  "handling",
        "difficulty":  1,
        "question":  "Can a labeled pesticide jug ever hold drinking water?",
        "choices":  [
                        "Never",
                        "Yes, if triple-rinsed",
                        "Yes, if labeled in marker",
                        "Yes, on a job site"
                    ],
        "answer":  0,
        "explanation":  "Labels forbid reusing nonrefillable containers.",
        "whyNot":  [
                       null,
                       "Rinsing does not make a pesticide jug safe for water.",
                       "A marker label does not make reuse safe.",
                       "No site allows reuse for drinking water."
                   ],
        "source":  "Termidor HE label"
    },
    {
        "id":  "core-104",
        "module":  "spills-disposal",
        "difficulty":  1,
        "question":  "What is the first step in a spill?",
        "choices":  [
                        "Leave the area and write the report later",
                        "Sweep it into a storm drain",
                        "Protect yourself and control the source",
                        "Wash it down with a hose"
                    ],
        "answer":  2,
        "explanation":  "PPE, then control. Never hose it down.",
        "whyNot":  [
                       "You must control it before leaving.",
                       "Storm drains lead to water.",
                       null,
                       "Water spreads the spill."
                   ],
        "source":  "Termidor HE label; Pesticide Environmental Stewardship, Spills"
    },
    {
        "id":  "core-105",
        "module":  "spills-disposal",
        "difficulty":  1,
        "question":  "What are the \u00273 Cs\u0027 of spills?",
        "choices":  [
                        "Call, clear, close the site",
                        "Control, contain, clean up",
                        "Cover, clean, and call the customer",
                        "Count, check, cancel the job"
                    ],
        "answer":  1,
        "explanation":  "Control, contain, clean up is the standard order.",
        "whyNot":  [
                       "These do not control or contain the spill.",
                       null,
                       "Calling the customer is not the second C.",
                       "These steps do not address the spill."
                   ],
        "source":  "Pesticide Environmental Stewardship, Spills [verify vs Core Manual]"
    },
    {
        "id":  "core-106",
        "module":  "spills-disposal",
        "difficulty":  1,
        "question":  "Which is good dike material for a liquid spill?",
        "choices":  [
                        "Plain paper towels",
                        "Water",
                        "Bleach",
                        "Sand or earth"
                    ],
        "answer":  3,
        "explanation":  "Termidor HE names inert material such as sand or earth.",
        "whyNot":  [
                       "Paper towels alone cannot dike a liquid spill.",
                       "Water spreads a spill instead of holding it.",
                       "Bleach is not an absorbent. Use inert material like sand or earth.",
                       null
                   ],
        "source":  "Termidor HE label"
    },
    {
        "id":  "core-107",
        "module":  "spills-disposal",
        "difficulty":  1,
        "question":  "Triple rinsing calls for filling the container with water to about:",
        "choices":  [
                        "Three-quarters full",
                        "The top",
                        "One-quarter full",
                        "One-half full"
                    ],
        "answer":  2,
        "explanation":  "Fill 1/4 full, cap, shake 10 seconds, pour, drain.",
        "whyNot":  [
                       "Labels say about one-quarter full, not three-quarters.",
                       "A full container is not what labels say. Fill about one-quarter.",
                       null,
                       "Labels say about one-quarter full, not one-half."
                   ],
        "source":  "Pesticide Environmental Stewardship; Termidor HE label"
    },
    {
        "id":  "core-108",
        "module":  "spills-disposal",
        "difficulty":  2,
        "question":  "How long do you shake during each rinse?",
        "choices":  [
                        "10 seconds",
                        "2 seconds",
                        "30 seconds",
                        "About 1 minute"
                    ],
        "answer":  0,
        "explanation":  "Shake for 10 seconds. Drain 10 seconds after flow starts to drip.",
        "whyNot":  [
                       null,
                       "2 seconds is too short. Labels say 10 seconds.",
                       "30 seconds is the pressure-rinse time, not the shake time.",
                       "One minute is longer than the 10 seconds labels give."
                   ],
        "source":  "Termidor HE label"
    },
    {
        "id":  "core-109",
        "module":  "spills-disposal",
        "difficulty":  2,
        "question":  "Where does rinsate go?",
        "choices":  [
                        "Onto a gravel driveway to dry in the sun",
                        "Down a utility sink that drains to a septic tank",
                        "Into application equipment or a mix tank",
                        "Into a storm drain, away from the house"
                    ],
        "answer":  2,
        "explanation":  "Add it to the tank, or store it for later use or disposal.",
        "whyNot":  [
                       "Driveways run off into drains.",
                       "Sinks send rinsate into water systems.",
                       null,
                       "Storm drains lead to water."
                   ],
        "source":  "Termidor HE label"
    },
    {
        "id":  "core-110",
        "module":  "spills-disposal",
        "difficulty":  2,
        "question":  "What is the preferred way to deal with extra finished dilution?",
        "choices":  [
                        "Use it by application to a labeled site per label directions",
                        "Pour it on a gravel driveway where it can soak in",
                        "Empty it in a ditch well away from the house",
                        "Bag it and put it in the customer\u0027s household trash"
                    ],
        "answer":  0,
        "explanation":  "Labels aim to avoid waste by use according to label directions.",
        "whyNot":  [
                       null,
                       "A gravel driveway is not a labeled site.",
                       "A ditch can carry it to water.",
                       "The label sends extras to labeled use or a disposal program, not the trash."
                   ],
        "source":  "Termidor HE label; Pesticide Environmental Stewardship"
    },
    {
        "id":  "core-111",
        "module":  "spills-disposal",
        "difficulty":  2,
        "question":  "What does Virginia ban when disposing of pesticides?",
        "choices":  [
                        "Cost more than a licensed waste hauler would charge",
                        "Require a receipt from the county landfill office",
                        "Fill a dumpster faster than it is picked up each week",
                        "Pollute a water supply or injure people or wildlife"
                    ],
        "answer":  3,
        "explanation":  "2VAC5-670-160 protects humans, wildlife, pollinators and water.",
        "whyNot":  [
                       "Cost is not the legal test.",
                       "Receipts are not the legal test.",
                       "Dumpster timing is not the legal test.",
                       null
                   ],
        "source":  "2VAC5-670-160"
    },
    {
        "id":  "core-112",
        "module":  "environment",
        "difficulty":  1,
        "question":  "What is drift?",
        "choices":  [
                        "Movement of a pesticide across the soil surface in rain water",
                        "Movement of pesticide through the air away from the target during or soon after application",
                        "Breakdown of a pesticide by sunlight on a treated surface",
                        "Movement of a pesticide down through the soil toward groundwater"
                    ],
        "answer":  1,
        "explanation":  "Virginia defines drift as airborne movement off target at or soon after application.",
        "whyNot":  [
                       "That is runoff.",
                       null,
                       "That is photodegradation.",
                       "That is leaching."
                   ],
        "source":  "2VAC5-685-10"
    },
    {
        "id":  "core-113",
        "module":  "environment",
        "difficulty":  1,
        "question":  "What is leaching?",
        "choices":  [
                        "Into the air as droplets",
                        "Down through soil with water",
                        "Over the soil surface with water",
                        "Through the air as vapor"
                    ],
        "answer":  1,
        "explanation":  "Leaching goes down. Runoff moves across.",
        "whyNot":  [
                       "That is particle drift.",
                       null,
                       "That is runoff.",
                       "That is vapor drift."
                   ],
        "source":  "Pesticide Environmental Stewardship [verify vs Core Manual]"
    },
    {
        "id":  "core-114",
        "module":  "environment",
        "difficulty":  1,
        "question":  "What is runoff?",
        "choices":  [
                        "Across the surface in water",
                        "Downward through the soil profile",
                        "Through the air as fine droplets",
                        "Up through plant roots and leaves"
                    ],
        "answer":  0,
        "explanation":  "Runoff travels with surface water.",
        "whyNot":  [
                       null,
                       "That is leaching.",
                       "That is drift.",
                       "That is plant uptake, not runoff."
                   ],
        "source":  "EPA Drift Introduction"
    },
    {
        "id":  "core-115",
        "module":  "environment",
        "difficulty":  2,
        "question":  "What is volatilization?",
        "choices":  [
                        "Sticks to soil particles near the surface",
                        "Is washed off a treated surface by rain or watering",
                        "Is picked up on insect feet and carried to the nest",
                        "Becomes a vapor after application and can move off target"
                    ],
        "answer":  3,
        "explanation":  "Vapor drift can happen after an application.",
        "whyNot":  [
                       "That is adsorption.",
                       "That is washoff.",
                       "That is transfer, not volatilization.",
                       null
                   ],
        "source":  "NPIC Drift"
    },
    {
        "id":  "core-116",
        "module":  "environment",
        "difficulty":  2,
        "question":  "With no wind limit on the label, what range is commonly advised?",
        "choices":  [
                        "Over 20 mph, so that droplets clear the site",
                        "Dead calm, with no air moving",
                        "3 to 8 mph, blowing away from sensitive areas",
                        "10 to 15 mph, blowing toward the treated target"
                    ],
        "answer":  2,
        "explanation":  "Below 3 mph can be variable; above 8 mph drift risk rises.",
        "whyNot":  [
                       "Over 20 mph is very high drift risk.",
                       "Dead calm can mean an inversion.",
                       null,
                       "Stronger winds raise drift risk."
                   ],
        "source":  "Pesticide Environmental Stewardship, Evaluate the Weather"
    },
    {
        "id":  "core-117",
        "module":  "environment",
        "difficulty":  2,
        "question":  "Fog in low spots on a calm morning suggests what?",
        "choices":  [
                        "Low humidity",
                        "Ideal weather for fine sprays",
                        "A temperature inversion",
                        "A drift-free spray window"
                    ],
        "answer":  2,
        "explanation":  "Fog can mean an inversion, which favors long-distance drift.",
        "whyNot":  [
                       "Fog means humid air, not low humidity.",
                       "Fine sprays drift more in an inversion.",
                       null,
                       "Inversions raise drift risk."
                   ],
        "source":  "NPIC Drift; Pesticide Environmental Stewardship"
    },
    {
        "id":  "core-118",
        "module":  "environment",
        "difficulty":  2,
        "question":  "Which change reduces spray drift?",
        "choices":  [
                        "Higher pressure and finer droplets",
                        "Raising the nozzle above the target",
                        "Spraying during stronger steady wind",
                        "Lower pressure and larger droplets"
                    ],
        "answer":  3,
        "explanation":  "Bigger droplets fall faster.",
        "whyNot":  [
                       "That makes drift worse.",
                       "A higher nozzle increases drift.",
                       "Stronger wind increases drift.",
                       null
                   ],
        "source":  "NPIC Drift"
    },
    {
        "id":  "core-119",
        "module":  "environment",
        "difficulty":  2,
        "question":  "The label says \u0027DO NOT make treatments while precipitation is occurring,\u0027 and it starts to drizzle. What do you do?",
        "choices":  [
                        "Stop until conditions meet the label",
                        "Spray faster to finish before it gets heavy",
                        "Add a surfactant so the mix stays in place",
                        "Raise the rate to make up for the rain"
                    ],
        "answer":  0,
        "explanation":  "This wording appears on Termidor labels.",
        "whyNot":  [
                       null,
                       "Speed does not make it legal.",
                       "A surfactant does not override the label.",
                       "Raising the rate breaks the label."
                   ],
        "source":  "Termidor HE label"
    },
    {
        "id":  "core-120",
        "module":  "environment",
        "difficulty":  2,
        "question":  "What does adsorption mean?",
        "choices":  [
                        "Dissolves in water and moves with it",
                        "Sticks to a surface such as soil particles",
                        "Evaporates from a surface into the air",
                        "Soaks into a solid, as water does in a sponge"
                    ],
        "answer":  1,
        "explanation":  "Ad- means on the surface. Ab- means into.",
        "whyNot":  [
                       "That is solubility.",
                       null,
                       "That is volatilization.",
                       "That is absorption."
                   ],
        "source":  "VTPP Quarterly 7(3)"
    },
    {
        "id":  "core-121",
        "module":  "environment",
        "difficulty":  1,
        "question":  "A label says the product is toxic to bees. What do you check before spraying shrubs?",
        "choices":  [
                        "Whether plants are in bloom and bees are foraging, and the label wording",
                        "The color of the flowers on the shrubs in that bed",
                        "Whether the house has brick or vinyl siding near the shrubs",
                        "The distance to the nearest road and the age of the shrubs"
                    ],
        "answer":  0,
        "explanation":  "Labels restrict use around blooming plants and foraging bees.",
        "whyNot":  [
                       null,
                       "Flower color does not decide the label limit.",
                       "Siding type has nothing to do with bees.",
                       "Road distance and plant age are not bee rules."
                   ],
        "source":  "Pesticide Environmental Stewardship, Pollinator Protection"
    },
    {
        "id":  "core-122",
        "module":  "environment",
        "difficulty":  3,
        "question":  "Which group\u0027s outdoor foliar labels must have a pollinator protection box?",
        "choices":  [
                        "Rodenticides in tamper-resistant bait stations",
                        "Gel baits used in cracks and crevices indoors",
                        "Certain neonicotinoids such as imidacloprid and dinotefuran",
                        "Pyrethrins and other botanical insecticides"
                    ],
        "answer":  2,
        "explanation":  "EPA requires this box for labeled outdoor foliar uses of clothianidin, dinotefuran, imidacloprid, and thiamethoxam.",
        "whyNot":  [
                       "Rodent bait stations are not foliar uses.",
                       "Indoor gels are not outdoor foliar uses.",
                       null,
                       "That box rule names certain neonicotinoids, not pyrethrins."
                   ],
        "source":  "Pesticide Environmental Stewardship, Pollinator Protection"
    },
    {
        "id":  "core-123",
        "module":  "environment",
        "difficulty":  1,
        "question":  "A sprayed driveway drains to a storm drain. What do you do?",
        "choices":  [
                        "Spray a second coat so the product binds to the surface",
                        "Keep product off hard surfaces, and away from drains",
                        "Ignore it if dry weather is forecast for that week",
                        "Rinse the driveway with a hose once the job is done"
                    ],
        "answer":  1,
        "explanation":  "EPA says to avoid storm drains and sweep granules back from hard surfaces.",
        "whyNot":  [
                       "A second coat adds more to run off.",
                       null,
                       "Dry weather does not make runoff to drains okay.",
                       "Rinsing sends product into the drain."
                   ],
        "source":  "EPA Drift Introduction"
    },
    {
        "id":  "core-124",
        "module":  "equipment",
        "difficulty":  1,
        "question":  "Why calibrate?",
        "choices":  [
                        "To clean the tank",
                        "To check the customer\u0027s water pressure",
                        "To reset the warranty",
                        "To apply the labeled amount"
                    ],
        "answer":  3,
        "explanation":  "Calibration matches output to label rate.",
        "whyNot":  [
                       "Calibration measures output. It does not clean the tank.",
                       "Calibration measures the sprayer, not house water pressure.",
                       "Calibration is not a warranty step.",
                       null
                   ],
        "source":  "Pesticide Environmental Stewardship, Calibration"
    },
    {
        "id":  "core-125",
        "module":  "equipment",
        "difficulty":  1,
        "question":  "What goes in the tank during backpack calibration?",
        "choices":  [
                        "Concentrate",
                        "Finished dilution",
                        "Solvent",
                        "Water only"
                    ],
        "answer":  3,
        "explanation":  "Use water with no pesticide.",
        "whyNot":  [
                       "Calibrate with water, not concentrate.",
                       "Calibrate with water, not mix.",
                       "Calibrate with water, not solvent.",
                       null
                   ],
        "source":  "Pesticide Environmental Stewardship, Backpack Sprayer"
    },
    {
        "id":  "core-126",
        "module":  "equipment",
        "difficulty":  2,
        "question":  "In the 1,000-sq-ft backpack method, what is measured last?",
        "choices":  [
                        "Hose diameter and the walking distance across the plot",
                        "Water sprayed into a container for the measured time",
                        "Air temperature at the start and end of the timed pass",
                        "Length of the nozzle and wand from the grip to the tip"
                    ],
        "answer":  1,
        "explanation":  "Spray into a container for the plot time. Ounces equal output per 1,000 sq ft.",
        "whyNot":  [
                       "Hose size is not measured.",
                       null,
                       "Air temperature is not part of the output test.",
                       "Wand length is not measured."
                   ],
        "source":  "Pesticide Environmental Stewardship, Backpack Sprayer"
    },
    {
        "id":  "core-127",
        "module":  "equipment",
        "difficulty":  2,
        "question":  "Which change alters sprayer output and calls for recalibration?",
        "choices":  [
                        "A new nozzle tip",
                        "A new customer address",
                        "A new service route",
                        "A new tank label"
                    ],
        "answer":  0,
        "explanation":  "Output depends on nozzle, pressure and speed.",
        "whyNot":  [
                       null,
                       "The address does not change sprayer output.",
                       "Routes do not change output.",
                       "A label sticker does not change output."
                   ],
        "source":  "General knowledge [verify vs Core Manual]"
    },
    {
        "id":  "core-128",
        "module":  "equipment",
        "difficulty":  1,
        "question":  "Why must Virginia application equipment have cut-off valves?",
        "choices":  [
                        "The spray tank can be emptied fully at the end of a job",
                        "The equipment can\u0027t be used without a key or a code",
                        "An operator can pass nontarget areas without contaminating them",
                        "The labeled rate can be doubled on heavy pest areas"
                    ],
        "answer":  2,
        "explanation":  "2VAC5-670-170 B states this.",
        "whyNot":  [
                       "Emptying the tank is not the purpose.",
                       "The rule is about contamination, not theft.",
                       null,
                       "Valves do not allow raising the rate."
                   ],
        "source":  "2VAC5-670-170"
    },
    {
        "id":  "core-129",
        "module":  "equipment",
        "difficulty":  2,
        "question":  "Why does a settled suspension create a rate problem?",
        "choices":  [
                        "Pressure doubles when solids collect at the bottom",
                        "Early spray is thin and late spray is too strong",
                        "The label changes once a product begins to settle",
                        "Spray strength stays the same from start to finish"
                    ],
        "answer":  1,
        "explanation":  "Solids collect low in the tank, so the dose is uneven across the tank.",
        "whyNot":  [
                       "Settling does not raise pressure.",
                       null,
                       "Settling does not change the label.",
                       "Settling makes strength uneven."
                   ],
        "source":  "VTPP Quarterly 7(3); teaching inference"
    },
    {
        "id":  "core-130",
        "module":  "math",
        "difficulty":  1,
        "question":  "How many fluid ounces are in 3 gallons?",
        "choices":  [
                        "256",
                        "300",
                        "512",
                        "384"
                    ],
        "answer":  3,
        "explanation":  "3 x 128 = 384.",
        "whyNot":  [
                       "256 is 2 gallons. 3 x 128 = 384.",
                       "300 is not a multiple of 128.",
                       "512 is 4 gallons.",
                       null
                   ],
        "source":  "Standard conversion"
    },
    {
        "id":  "core-131",
        "module":  "math",
        "difficulty":  1,
        "question":  "A half acre is how many square feet?",
        "choices":  [
                        "10,890",
                        "5,280",
                        "21,780",
                        "43,560"
                    ],
        "answer":  2,
        "explanation":  "43,560 / 2 = 21,780.",
        "whyNot":  [
                       "10,890 is a quarter acre.",
                       "5,280 is feet in a mile.",
                       null,
                       "43,560 is a full acre."
                   ],
        "source":  "Standard conversion"
    },
    {
        "id":  "core-132",
        "module":  "math",
        "difficulty":  1,
        "question":  "The rate is 1.5 fl oz per 1,000 sq ft. The lawn is 80 ft by 50 ft. How much product?",
        "choices":  [
                        "6 fl oz",
                        "4 fl oz",
                        "1.5 fl oz",
                        "12 fl oz"
                    ],
        "answer":  0,
        "explanation":  "Area 4,000 sq ft. 4 x 1.5 = 6.",
        "whyNot":  [
                       null,
                       "4 fl oz uses 1 fl oz per 1,000 sq ft, not 1.5.",
                       "1.5 fl oz covers only 1,000 sq ft. The lawn is 4,000.",
                       "12 fl oz doubles the correct amount."
                   ],
        "source":  "Math example"
    },
    {
        "id":  "core-133",
        "module":  "math",
        "difficulty":  1,
        "question":  "A mix calls for 2 fl oz per gallon. How much for 3.5 gallons?",
        "choices":  [
                        "6 fl oz",
                        "9 fl oz",
                        "7 fl oz",
                        "5.5 fl oz"
                    ],
        "answer":  2,
        "explanation":  "2 x 3.5 = 7.",
        "whyNot":  [
                       "6 fl oz is for 3 gallons.",
                       "9 fl oz is too much. 2 x 3.5 = 7.",
                       null,
                       "5.5 fl oz adds instead of multiplying."
                   ],
        "source":  "Math example"
    },
    {
        "id":  "core-134",
        "module":  "math",
        "difficulty":  1,
        "question":  "A sprayer applies 1 gallon per 1,000 sq ft. How much area does a 4-gallon tank cover?",
        "choices":  [
                        "4,000 sq ft",
                        "1,000 sq ft",
                        "2,000 sq ft",
                        "8,000 sq ft"
                    ],
        "answer":  0,
        "explanation":  "4 x 1,000 = 4,000.",
        "whyNot":  [
                       null,
                       "1,000 sq ft is one gallon\u0027s worth.",
                       "2,000 sq ft is two gallons\u0027 worth.",
                       "8,000 sq ft needs 8 gallons."
                   ],
        "source":  "Math example"
    },
    {
        "id":  "core-135",
        "module":  "math",
        "difficulty":  2,
        "question":  "A triangular bed has a 30 ft base and 20 ft height. What is its area?",
        "choices":  [
                        "600 sq ft",
                        "50 sq ft",
                        "150 sq ft",
                        "300 sq ft"
                    ],
        "answer":  3,
        "explanation":  "1/2 x 30 x 20 = 300.",
        "whyNot":  [
                       "600 forgets to halve base times height.",
                       "50 adds base and height.",
                       "150 halves twice.",
                       null
                   ],
        "source":  "Standard formula"
    },
    {
        "id":  "core-136",
        "module":  "math",
        "difficulty":  2,
        "question":  "A circular bed has a 10-ft radius. Which is closest to its area?",
        "choices":  [
                        "628 sq ft",
                        "314 sq ft",
                        "31.4 sq ft",
                        "100 sq ft"
                    ],
        "answer":  1,
        "explanation":  "3.14 x 10 x 10 = 314.",
        "whyNot":  [
                       "628 doubles the area.",
                       null,
                       "31.4 is off by a factor of ten.",
                       "100 forgets to multiply by 3.14."
                   ],
        "source":  "Standard formula"
    },
    {
        "id":  "core-137",
        "module":  "math",
        "difficulty":  2,
        "question":  "In a 1,000 sq ft test you collect 64 fl oz. What is the output?",
        "choices":  [
                        "1/4 gallon per 1,000 sq ft",
                        "1/2 gallon per 1,000 sq ft",
                        "1 gallon per 1,000 sq ft",
                        "2 gallons per 1,000 sq ft"
                    ],
        "answer":  1,
        "explanation":  "64 / 128 = 0.5 gallon.",
        "whyNot":  [
                       "32 fl oz is a quarter gallon.",
                       null,
                       "128 fl oz is 1 gallon. 64 is half.",
                       "2 gallons is 256 fl oz."
                   ],
        "source":  "Pesticide Environmental Stewardship method"
    },
    {
        "id":  "core-138",
        "module":  "math",
        "difficulty":  2,
        "question":  "Output is 1/2 gallon per 1,000 sq ft. How much mix do you need for 5,000 sq ft?",
        "choices":  [
                        "2.5 gallons",
                        "5 gallons",
                        "1.25 gallons",
                        "10 gallons"
                    ],
        "answer":  0,
        "explanation":  "5 x 0.5 = 2.5.",
        "whyNot":  [
                       null,
                       "5 gallons uses 1 gallon per 1,000.",
                       "1.25 gallons halves the right answer.",
                       "10 gallons uses 2 gallons per 1,000."
                   ],
        "source":  "Math example"
    },
    {
        "id":  "core-139",
        "module":  "math",
        "difficulty":  3,
        "question":  "A sprayer applies 2 gallons per 1,000 sq ft. The rate is 3 fl oz per 1,000 sq ft. How much product goes into a 4-gallon tank?",
        "choices":  [
                        "3 fl oz",
                        "12 fl oz",
                        "8 fl oz",
                        "6 fl oz"
                    ],
        "answer":  3,
        "explanation":  "4 gallons covers 2,000 sq ft. 2 x 3 = 6.",
        "whyNot":  [
                       "3 fl oz covers only 1,000 sq ft.",
                       "12 fl oz is for 4,000 sq ft.",
                       "8 fl oz is not 3 x 2.",
                       null
                   ],
        "source":  "Math example"
    },
    {
        "id":  "core-140",
        "module":  "math",
        "difficulty":  2,
        "question":  "A mix table says 0.8 fl oz per gallon. How much for 5 gallons?",
        "choices":  [
                        "5 fl oz",
                        "8 fl oz",
                        "4 fl oz",
                        "0.8 fl oz"
                    ],
        "answer":  2,
        "explanation":  "5 x 0.8 = 4.",
        "whyNot":  [
                       "5 fl oz uses 1 fl oz per gallon.",
                       "8 fl oz uses 1.6 fl oz per gallon.",
                       null,
                       "0.8 fl oz is for 1 gallon."
                   ],
        "source":  "Math example"
    },
    {
        "id":  "core-141",
        "module":  "math",
        "difficulty":  2,
        "question":  "A 16-oz bag is applied at 2 oz per 1,000 sq ft. What does the bag treat?",
        "choices":  [
                        "16,000 sq ft",
                        "4,000 sq ft",
                        "8,000 sq ft",
                        "2,000 sq ft"
                    ],
        "answer":  2,
        "explanation":  "16 / 2 = 8 units of 1,000.",
        "whyNot":  [
                       "16,000 sq ft would need 32 oz.",
                       "4,000 sq ft uses only 8 oz.",
                       null,
                       "2,000 sq ft uses only 4 oz."
                   ],
        "source":  "Math example"
    },
    {
        "id":  "core-142",
        "module":  "math",
        "difficulty":  1,
        "question":  "The Registered Technician exam has 50 questions and a 76% pass mark. What is the minimum correct?",
        "choices":  [
                        "35",
                        "40",
                        "45",
                        "38"
                    ],
        "answer":  3,
        "explanation":  "0.76 x 50 = 38.",
        "whyNot":  [
                       "35 is 70%, below the pass mark.",
                       "40 passes but is not the minimum.",
                       "45 passes but is not the minimum.",
                       null
                   ],
        "source":  "VDACS RT packet"
    },
    {
        "id":  "core-143",
        "module":  "math",
        "difficulty":  1,
        "question":  "A rectangular house is 40 ft by 30 ft. What is its perimeter?",
        "choices":  [
                        "140 ft",
                        "70 ft",
                        "120 ft",
                        "1,200 ft"
                    ],
        "answer":  0,
        "explanation":  "2 x (40 + 30) = 140.",
        "whyNot":  [
                       null,
                       "70 is half the perimeter.",
                       "120 is not the sum of all sides.",
                       "1,200 is the area, not the perimeter."
                   ],
        "source":  "Standard formula"
    }
];

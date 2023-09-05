import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { colors, i18n } from '../../../services';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const iconsize = 25;
export const subMenuMedicalServices = () => [
    {
        E_NAME: "OBSTETRICS & GYNECOLOGY",
        A_NAME: "طب أمراض النساء والولادة",
        subMenu: [
            {
                E_NAME: "GYNECOLOGY",
                A_NAME: "العقم والتأخر في الانجاب",
                A_DESCRIPTION: `العقم وتأخر الانجاب من الحالات التي يمكن طلب المساعدة الطبية فيها وإيجاد سبل العلاج متى ما تم معرفة الأسباب وراء ذلك. إن وسائل الحمل الحديثة ساعدت الكثير من المصابين بـالعقم أو عدم القدرة على الانجاب في إيجاد حلول علمية متطورة بديلة تساعد على زيادة فرص الحمل وإنجاب الأطفال ، لا تتردد في التواصل معنا.`,
                E_DESCRIPTION: `United Doctors Hospital offers the very latest in the prevention, diagnosis, and treatment of gynecological disorders.
A variety of surgical procedures can be performed with our laparoscopy and sophisticated laser surgery. Our physicians can — where appropriate — perform many complicated surgical procedures on an outpatient basis. When your surgery is done, you will appreciate our caring, professional staff, who will assist your physician with your surgery, monitor your recovery, and then care for you as you prepare to leave or return to your private room.`,
                image: "obstretics",
                icon: <FontAwesome5 name="baby" size={iconsize} color={colors.darkGrey} />
            },
            {
                E_NAME: "IVF & ICSI",
                A_NAME: "برنامج أطفال الأنابيب",
                CAPITALIZE: true,
                A_DESCRIPTION: `يقدم مستشفى الأطباء المتحدون أحدث علاجات وتكنولوجيا الخصوبة في المملكة العربية السعودية وتتم معاملة كل المرضى الذين يخضعون لبرنامج أطفال الأنابيب بعناية واحترام لخصوصيتهم من قبل فريق العمل المؤهل في المستشفى. نقدم الأحدث لأن عملائنا يستحقون الأفضل دائما...`,
                E_DESCRIPTION: `UDH offers the latest in the treatment of cases of infertility male and female causes and doctors perform their various roles in the care of infertile patients.
A large proportion of infertile couple have a realistic expectation of being able to have children.
Our lab facility referred to dermatologist or urologist with the cooperation of gynecologist can reach the best results to solve all the problems.`,
                image: "icsi",
                icon: <MaterialIcons name="hdr-strong" size={iconsize} color={colors.darkGrey} />
            },
        ],
        icon: <MaterialCommunityIcons name="human-pregnant" size={iconsize} color={colors.darkGrey} />
    },
    {
        E_NAME: "PEDIATRIC & NEONATOLOGY",
        A_NAME: "قسم الأطفال وحديثي الولادة",
        A_DESCRIPTION: `<p>يُعرف هذا القسم في المستشفى بأنه (صديق الطفل الرائد ) نظرا لاعتنائه بالجوانب الوقائية والعلاجية لصحة الأطفال.</p>
        <p>يقدم القسم خدماته طوال اليوم حيث يتميز قسم الأطفال وحديثي الولادة بوجود طاقم من الاستشاريين وأخصائيي طب الأطفال والأطباء المقيمين يعملون في العيادات على مدار على مدار 24 ساعة يوميا. فضلاً عن وجود طاقم طبي من الإستشاريين المؤهلين على أعلى المستويات يتواجدون عند الضرورة على مدار 24 ساعة ، مقدمين بذلك مجموعة متكاملة من الخدمات الطبية لكافة الشرائح العمرية بداية من الأطفال حديثي الولادة وحتى مرحلة المراهقين ويشمل تقديم كافة اللقاحات والتطعيمات الطبية.</p>`,
        E_DESCRIPTION: `The department provides round the clock services with In-House pediatrics specialists and 24-hours clinic coverage with highly qualified consultants rendering a variety of medical services to ages ranging from new born to adolescent, including all vaccinations. The department has a well-equipped NICU, managed by highly qualified Consultant Neonatologists, backed up by highly qualified Neonatologists and qualified trained nurses, using current technology in managing pre- term babies as young as 28 weeks and as small as 800 grams, in addition to treating other neonatal problems. It also uses the ICU where critical pediatric cases are admitted to manage a variety of pediatric problems as comma, status asthmaticus. Our newborn nursery is a very busy area managed by paediatricians, trained nurses and the on call consultants. Most types of illness with or without complications are competently managed because of interdepartmental references and Intensive Care Unit in the hospital.`,
        image: "pediatrics",
        SHOWASHTML: i18n.locale === 'ar',
        icon: <MaterialCommunityIcons name="human-baby-changing-table" size={iconsize} color={colors.darkGrey} />
    },
    {
        E_NAME: "Newborn Intensive care unit",
        A_NAME: "وحدة العناية المركزة لحديثي الولادة",
        A_DESCRIPTION: `ويضم قسم الأطفال أيضاً وحدة العناية المركزة لحديثي الولادة المجهزة بأحدث الأجهزة ويديرها نخبة مؤهلة على أعلى المستويات من استشاريي طب الأطفال وحديثي الولادة ويعاونهم مجموعة متميزة من أخصائي طب الأطفال وطاقم مدرب من التمريض فضلاً عن اعتماد القسم على أحدث الوسائل التكنولوجية في التعامل مع الأطفال المبتسرين الحديثي الولادة الذين تقل أعمارهم عن ثمان وعشرين شهريا ولا تزيد أوزانهم عن 111 جرام. وإضافةً إلى معالجة مشكلات الأطفال حديثي الولادة الأخرى، يستخدم القسم وحدة العناية المركزة في معالجة حالات الأطفال الحديثي الولادة الحرجة للتعامل مع المشكلات المختلفة للأطفال مثل حالات الإغماء والربو الشعبي.
يقوم على إدارة وحدة رعاية الأطفال حديثي الولادة أطباء استشاريين أكفاء في طب الأطفال وأطباء أخصائيين في طب الأطفال وطاقم تمريضي مدرب على أعلى المستويات. ويعالج قسم طب الأطفال معظم الحالات المرضية التي يصاحبها أو لا يصاحبها مضاعفات مرضية وذلك لإمكانية إحالة الحالات المرضية بين الأقسام الداخلية للمستشفى ووحدة العناية المركزة.`,
        E_DESCRIPTION: `<customel>Newborn Intensive care unit</customel>
<p>The 7-bed Newborn Intensive care Unit (NICU) in the united doctors hospital (UDH) is a state of the art intensive care unit designed to provide care for newborns. The unit serves critically ill newborns and premature infants who require medical intervention .</p>

<customel>Neonatal care Team</customel>
<p>In addition to certified attending neonatologist, the newborn care team consist of registrar, resident, staff nurses, neonatal nurse practitioners, charge nurses, social workers, case managers, in the unit to provide round the clock care.</p>

<p>The neonatal intensive care unit(NICU) provides comprehensive care to critically ill newborns. Neonatologist supervise around-the clock care of these infants. A full complement of experiences nurses, neonatal nurse practitioners staff . The NICU’s focus is to meet the needs of the entire family. The staff is sensitive to the family and the development needs of the infant.
The department has outpatient clinics for baby checks, immunization and other problems . The Ambulatory Pediatric Services Department renders round-the-clock emergency services.</p>`,
        image: "pediatricsalt",
        SHOWASHTML: i18n.locale !== 'ar',
        icon: <MaterialCommunityIcons name="baby-face-outline" size={iconsize} color={colors.darkGrey} />
    },
    {
        E_NAME: "INTERNAL MEDICINE",
        A_NAME: "الطب الباطني",
        subMenu: [
            {
                E_NAME: "Endocrinology and Diabetes",
                A_NAME: "الغدد الصماء ومرض السكري",
                A_DESCRIPTION: `رعاية مرضى السكري واضطرابات الغدة الدرقية واضطرابات النمو عند الأطفال واضطرابات الغدة النخامية والغدد التناسلية والسمنة وارتفاع ضغط الدم وأمراض العظام الأيضية يتم تشخيصها من قبل استشاريين لتقييم كثافة أملاح العظام ومراقبة علاج هشاشة العظام.`,
                E_DESCRIPTION: `Caters diabetic patients, Thyroid Disorders, Growth Disorders in children, Pituitary Disorders, Reproductive Endocrinology, Excessive Weight Gain (Obesity) and Endocrine Hypertension. Metabolic Bone Disease are catered by Consultants with facilities for estimation of Bone Mineral Density (BMD) and monitoring of therapy for osteoporosis.`,
                image: "diabetes",
                icon: <MaterialCommunityIcons name="spoon-sugar" size={iconsize} color={colors.darkGrey} />
            },
            {
                E_NAME: "Cardiology",
                A_NAME: "أمراض القلب",
                A_DESCRIPTION: `كجزء من قسم الطب الباطني يقدم العديد من الإجراءات التشخيصية غير الجراحية لأمراض القلب على غرار جهاز تخطيط القلب 04 والتخطيط الكهربائي لعضلة القلب واختبار الجهد ودوبلر الملون ثنائي الأبعاد وأشعة إيكو للقلب عبر القفص الصدري والمريء وجهاز رصد دقات القلب لمدة أربع وعشرين ساعة (مراقب هولتر) وزرع منظم دقات القلب المؤقت والدائم. إدارياً يعكف القسم على تنفيذ خطة واسعة النطاق لحالات أمراض القلب والأوعية الدموية في المستقبل القريب من أجل توسيع وحدة أمراض القلب لتشتمل على خدمات جراحية مثل قسطرة القلب وتصوير الشريان التاجي بالأشعة لأغراض تشخيصية وأغراض علاجية.`,
                E_DESCRIPTION: `As a part of Internal Medicine Department providing many of the diagnostic procedures that include non-invasive services such as 12 leads ECG, Treadmill ECG Stress test, 2D – Color Doppler, ECHO (Trans Thoracic and Trans-Esophageal Echocardiogram),24 hours Heart Rate Monitoring (Holter Monitor) and Implanting temporary and permanent pacemakers.
In addition to management, the wide range of Cardiovascular cases plan in the near future to extend the Cardiology Unit to include invasive services such as Cardiac Catheterization, Coronary Angiogram for diagnostic and therapeutic purposes.`,
                image: "cardiology",
                icon: <FontAwesome5 name="hand-holding-heart" size={iconsize} color={colors.darkGrey} />
            },
            {
                E_NAME: "Dermatology",
                A_NAME: "طب الأمراض الجلدية",
                A_DESCRIPTION: `يقدم قسم طب الأمراض الجلدية رعاية جيدة لمرضى العيادات الخارجية ورعاية مركزة للحالات الطارئة مثال ذلك متلازمة ستيفن جونسون وما إلى ذلك من أمراض جلدية خطيرة تحتاج إلى عناية خاصة. يتمتع استشاريو الأمراض الجلدية في المستشفى بالخبرة ليس فقط في الأمراض الجلدية بل أيضاً في الأمراض التي تنتقل عن طريق الاتصال الجنسي. يعمل القسم بصورة موازية جداً للأقسام الأخرى التي توجد في المستشفى في معالجة مشكلات محددة. إضافة إلى ذلك يعتبر العلاج بالليزر جزءاً من نطاق علاج الأمراض الجلدية وذلك باستخدام أجهزة الليزر الحديثة.`,
                E_DESCRIPTION: `Dermatology offers outpatient care, intensive care for emergencies like Stevens Johnson Syndrome and etc.
The Consultants are experts not only in skin disorders but also in STDs. The department functions closely in association with other department at the hospital to handle specific problems. In addition, Laser treatments are also part of the scope which utilizes current laser machines.`,
                image: "dermatology",
                icon: <MaterialCommunityIcons name="face-woman-outline" size={iconsize} color={colors.darkGrey} />
            },
            {
                E_NAME: "Gastroenterology",
                A_NAME: "طب الجهاز الهضمي",
                A_DESCRIPTION: `تضم وحدة طب الجهاز الهضمي أفضل أطباء الجهاز الهضمي الذين يتمتعون بخبرات كبيرة في الخارج وفي مدينة جدة بالمملكة العربية السعودية. إجراء المناظير الباطنية للصفراء والتحكم في مضاعفات ارتفاع ضغط الدم في الوريد البابي وتوسع أوردة المريء والمستقيم واستئصال الزوائد اللحمية في الكولون وتثبيت أنبوب التغذية ودعامات المريء في الانتشار والقيام بنسبة أكبر من أعمال المناظير الكلية .

وقد تم توسعة القسم بوحدة تصوير الكبد والمرارة ( تشخيصي وعلاجي) المشتملة على عمليات استئصال العضلة العاصرة واستخراج الحصوات والخدمات المستمرة طوال الأربع والعشرين ساعة لحالات النزيف الحاد والفشل الكبدي الحاد بالإضافة إلى العمل الشامل في أمراض الكبد شديدة العدوى والتقييم المخبري لالتهابات الكبد (أ. ب. ج. د).`,
                E_DESCRIPTION: `Gastroenterology Service has the input of the best medical gastroenterologists with extensive experience abroad and in Jeddah, Kingdom of Saudi Arabia. Interventional Endoscopy relating to the biliary tract and management of complications of portal hypertension, in addition to oesophageal and rectal dilation, colonic polypectomies and the placement of feeding gastronomies and oesophageal stents which continues to expand and comprises a greater percentage of the total endoscopy work of the department. The other facilities extended by the department are: ERCPs (both diagnostic and therapeutic) including Sphincterotomies, Stone Extraction, 24-hour service for acute bleeds and acute liver failure. Comprehensive work up in a chronic liver disease and Serological assessment for Hepatitis A,B,C,D,E.`,
                image: "gastroenterology",
                icon: <MaterialCommunityIcons name="stomach" size={iconsize} color={colors.darkGrey} />
            },
            {
                E_NAME: "Rheumatology",
                A_NAME: "الروماتيزم",
                A_DESCRIPTION: `يضم المستشفى خبراء على مستوى عال في هذا المجال يقدمون الرعاية الطبية باستخدام العديد من التقنيات والإجراءات مثل التشخيص الطبي والعلاجي وحقن المفاصل ، وحقن الأنسجة الرخوة المختلفة وتنفيذ مختلف التحاليل المخبرية والأشعة وغيرها من الإجراءات التشخيصية والعلاجية.`,
                E_DESCRIPTION: `With experts in this field, doctors administers care using the following procedures: Various joints diagnostic and therapeutic injection and aspiration, various soft tissue injection, interpreting various laboratory tests and various x-rays and other diagnostic procedures.`,
                image: "rheumatology",
                icon: <MaterialCommunityIcons name="hand" size={iconsize} color={colors.darkGrey} />
            },
            {
                E_NAME: "Neurology",
                A_NAME: "طب الأمراض العصبية",
                A_DESCRIPTION: `في ظل تواجد استشاريين خبراء يقدمون الخدمات التشخيصية والعلاجية للمساعدة على ضمان الرعاية السريعة والتشخيص السليم والعلاج. ويتم العمل في القسم مع مختلف الأخصائيين والاستشاريين الطبيين من بقية الأقسام لتوفير الاستشارات ووضع الخطط العلاجية السليمة.`,
                E_DESCRIPTION: `Experienced neurologists offer expert consultative, diagnostic and therapeutic services. To help ensure prompt care and proper diagnosis and treatment, they work collaboratively with various medical specialists, including radiologists among others. Neurologists at United Doctors Hospital`,
                image: "neurology",
                icon: <MaterialCommunityIcons name="brain" size={iconsize} color={colors.darkGrey} />
            },
        ],
        icon: <MaterialCommunityIcons name="human" size={iconsize} color={colors.darkGrey} />
    },
    {
        E_NAME: "THE DEPARTMENT OF SURGERY",
        A_NAME: "قسم الجراحة",
        subMenu: [
            {
                E_NAME: "General Surgery",
                A_NAME: "الجراحة العامة",
                A_DESCRIPTION: `هي خدمة مرتبطة بالمرافق الجراحية بالمنظار: يتعامل مع جميع أمراض الجهاز الهضمي بأكمله، بالإضافة إلى الكبد، والمرارة والمثانة، وعلاج جميع المشاكل الجراحية المتعلقة بالجهاز الهضمي الجراحي. تشتمل الخدمات التي يقدمها قسم الجراحة العامة على تفريغ أكياس البنكرياس وجراحة ضيق المريء وجراحة الفتق الحجابي وجراحة استئصال المعدة والاستئصال الجزئي لسرطان الأمعاء وجراحة بوتش لالتهابات الأمعاء والسيطرة على الناسور المعوي.`,
                E_DESCRIPTION: `General Surgery is a full-pledged service with the Laparoscopic surgical facilities: deals with all the disease of the entiredigestive tract, besides liver, gall bladder and the treatment of all surgical problems related to digestive tract. The services offered by the department includes Drainage of Pancreatic Pseudo Cyst, Surgery for Esophageal Stricture, Surgery for Hiatus Hernia, Total Gastrectomy, Radical Resections for Cancer of the bowel, Pouch Surgery for Inflammatory Bowel Diseases, Management of Intestinal Fistula etc.`,
                image: "surgery",
                icon: <Fontisto name="surgical-knife" size={iconsize} color={colors.darkGrey} />
            },
            {
                E_NAME: "Orthopedic Surgery",
                A_NAME: "جراحة العظام",
                A_DESCRIPTION: `قسم جراحة العظام في مستشفى الأطباء المتحدون متخصص في الوقاية والتشخيص والعلاج لاضطرابات الجهاز الحركي. يوفر مستشفى الأطباء المتحدون نخبة من الجراحين المتخصصين في جراحات العظام واستشاريين متميزين ويقدم خدمات علاجية عالية الكفاءة بأسعار تنافسية.`,
                E_DESCRIPTION: `Orthopedic Surgery in UDH specializes in the prevention, diagnosis and treatment of disorders of the musculoskeletal system. Orthopedic surgeons specialized in surgery, clinical consultants and treatment with high quality and cost effective orthopedic care.`,
                image: "ortsurgery",
                icon: <Ionicons name="git-merge-outline" size={iconsize} color={colors.darkGrey} />
            },
            {
                E_NAME: "Ear, Nose, and Throat (ENT)",
                A_NAME: "الأنف والأذن والحنجرة",
                A_DESCRIPTION: `يشتمل قسم الأنف والأذن والحنجرة على أحدث أدوات التشخيص الحديثة والمرافق اللازمة لاستخدام أجهزة الميكروسكوب ومناظير الأنف وأجهزة قياس طبلة الأذن ومنظار فحص الحنجرة وقياس السمع. يشتمل قسم العيادة الخارجية على وحدة سمعية يديرها أخصائي سمعيات ذو كفاءة عالية. يلبي هذا القسم احتياجات حالات الأنف والأذن والحنجرة المعروفة بالاعتماد على أحدث الأجهزة العالمية للحصول على أفضل النتائج ومن أجل الوصول إلى رضى المرضى. يهتم قسم الأنف والأذن والحنجرة كذلك بالإجراءات الجراحية التجميلية المعقدة التي تتضمن عمليات إصلاح الحنك واللهاة والهدف من هذه العمليات السيطرة على الشخير ومعالجة متلازمة خناق النوم توقف التنفس الإنسدادي أثناء النوم) وعلاج تصلب الأذن وإصلاح طبلة الأذن.`,
                E_DESCRIPTION: `ENT is fully equipped with most modern diagnostic tools with facilities for Microscopes, Nasal Endoscopies, Tympanometry, Flexible Endoscopic Laryngoscopy and Audiometry. The Outpatient Department has Audiology Section handled by qualified Audiologist. Overall patient management and satisfaction. Another highlight of this department is that, Complex Plastic Surgical Procedures involving like Uvulopalatoplasty (UVPP) – Operation for snoring and obstructive sleep apnea syndrome, Stapedectomy and Tympanoplasty are also offered.`,
                image: "ent",
                icon: <Ionicons name="ear-outline" size={iconsize} color={colors.darkGrey} />
            },
            {
                E_NAME: "Dental Clinic",
                A_NAME: "طب وجراحة الأسنان",
                A_DESCRIPTION: `توفر العيادة خدمات سنية للمرضى الذين يعانون من مشكلات حادة في الأسنان داخل نطاق خدمات الوحدة ويتوفرعلاج الحالات الطارئة للأسنان على مدار الأربع والعشرين ساعة يومياً. تقدم الوحدة خدمات حشو وعلاج الأسنان والجراحة المشتملة وغير القاصرة على استئصال جذور الأسنان ومعالجة اللثة وتصريف الخراج وقلع الأسنان والقلع الجراحي للأسنان الزائد ازالة تاج الأسنان التالفة وجراحة الأسنان وطب الأسنان الترميمي.`,
                E_DESCRIPTION: `Dental Clinic provides service for acute dental problems within the unit scope of service. Treatment for dental emergencies is available as On-Call basis for 24 hours a day. It provides, filling and treatment, surgical, to include Apicectomy, Gum Treatment, Drainage of Abscess, Extraction of tooth, Surgical Extraction of impacted tooth, Surgical Removal of Perichoronal flap and Restorative Dentistry.`,
                image: "dentclinic",
                icon: <MaterialCommunityIcons name="tooth-outline" size={iconsize} color={colors.darkGrey} />
            },
            {
                E_NAME: "Ophthalmology Clinic",
                A_NAME: "طب وجراحة العيون",
                A_DESCRIPTION: `العيادات العينية مجهزة بأدوات أساسية ورئيسية من أجل التعامل مع أمراض العيون المعروفة سواءً كان ذلك طبياً أو جراحياً. تشتمل عيادة العيون على مقياس الإنكسار الأوتوماتيكي للنظارات الطبية أو للعدسات اللاصقة أو للوصفات الطبية والمصباح ذو الفلقة لأمراض العين الخارجية سواء كانت أمراض بكتيرية أو فيروسية أو التهابات أو أجسام غريبة أو كدمات ومناظير العين المباشرة وغير المباشرة لأمراض العين الداخلية مثال ذلك المياه البيضاء والمياه الزرقاء والتهاب العين والشبكية وما إلى ذلك ومقياس ضغط دم العين لقياس الضغط داخل مقلة العين (المياه الزرقاء) وأدوات الجراحة البسيطة وورم الجفون والملتحمة واستئصال الظفرة من الملتحمة وحالات العلاج الضوئي المحولة من العيادات الأخرى )العيادات الداخلية والعيادات الخارجية والمعاناة من كدمات مقلة العين والأمراض الدائمة مثل مرض السكري وضغط العين والصداع والتهابات مقلة العين والأمراض الروماتيزمية وما إلى ذلك من أمراض .`,
                E_DESCRIPTION: `Ophthalmology Clinic is equipped with the main and basic instruments to manage the common eye diseases whether medically or surgically. Auto-refractometer (for eyeglasses or contact lenses, prescription), Slit lamp: for external eye diseases (bacterial or viral, allergic, foreign bodies, trauma, etc), Ophthalmoscopes (direct & indirect) for internal eye (cataracts, glaucomas, uveitis, vitreo-retinal, etc), Tanometers: for intraocular pressure measurements (glaucomas), instruments for minor surgeries, swelling of the lids and conjunctiva, ptyregum, PTDs of referred cases from other clinics (outpatient or inpatient), suffering from ocular traumas or systematic disease (Diabetes, Hypertension, headache, ocular allergies, rheumatic diseases, etc) are examined in the ophthalmology clinic.`,
                image: "optclinic",
                icon: <MaterialCommunityIcons name="eye-settings-outline" size={iconsize} color={colors.darkGrey} />
            },
            {
                E_NAME: "Urology Services",
                A_NAME: "طب وجراحة المسالك البولية",
                A_DESCRIPTION: `يتم معالجة الحالات التي تعاني من الأمراض التناسلية عند الذكور (في حين يعالج طبيب أمراض النساء مشكلات الأعضاء التناسلية عند الإناث). يجري طبيب المسالك البولية في مستشفى الأطباء المتحدون مئات العمليات الجراحية الصغرى سنوياً لمعالجة العديد من المشكلات المتعلقة بالجهاز البولي. وإن هذه الأنواع من التدخلات الجراحية الصغرى تقدم نتائج مذهلة وغالباً ما يبقى المرضى فترات أقصر في المستشفى بعد إجراء مثل هذه العمليات وبذلك يتم تحقيق الحد من الشعور بعدم الراحة وكذلك احتماليات النزيف وتقل فترة النقاهة التي تستوجب البعد عن العمل والأنشطة المعتادة. يجري أطباء المسالك البولية في مستشفى الأطباء المتحدون نوعين من الجراحة البسيطة هي عمليات الكلى والمناظير المستخدمة في تشخيص وعلاج اضطرابات المسالك البولية العليا.`,
                E_DESCRIPTION: `Urology Services at UDH provide expert care for male and female patients of all ages who suffer from problems of the urinary tract. Urologists also attend to diseases and conditions of the male reproductive organs (Gynecologist treat problems of the female reproductive organs). UDH urologist performs hundreds of minimally invasive operations each year for a variety of urologic problems. These few types of minimally invasive surgical procedures produce excellent results and patients often have shorter hospital stays, less discomfort and bleeding and a shorter recovery period including less time away from work and regular activities. Two types of minimally invasive surgery that UDH urologist are well known for are kidney operations and endoscopic procedures used to diagnose and treat upper urinary tract disorders.`,
                image: "urolservices",
                icon: <MaterialCommunityIcons name="ribbon" size={iconsize} color={colors.darkGrey} />
            },
        ],
        icon: <FontAwesome5 name="diagnoses" size={iconsize} color={colors.darkGrey} />
    },
    {
        E_NAME: "THERAPEUTIC AND DIAGNOSTIC IMAGING",
        A_NAME: "تدخلات الأشعة العلاجية والتشخيصية",
        A_DESCRIPTION: `تعتبر تدخلات الأشعة التشخيصية وأشعة فحص الثدي والأشعة المقطعية والأشعة التشخيصية فوق الصوتية أكثر التدخلات اليومية استخداماً. تشتمل الخدمات ذات الصلة أو المصاحبة للأشعة على مراقبة وتقييم ضمان الجودة ومراقبة الجودة المشتملة وغير القاصرة على حماية المرضى وفريق العمل من الإشعاع الضار وتفسير الأشعة وكتابة التقرير وتسجيل وإدارة السجلات والتعليم المستمر.

تسمح المعدات المحمولة الواقية من الأشعة السينية بالحصول على الصور الإشعاعية في الجراحة وفي قسم الرعاية الطبية أو الجراحية المركزة.
يتوفر جهازين للتصوير القوسي في غرفة العمليات لجراحات العظام وإجراءات المسالك البولية.
تركيب جهاز البانوراما الرقمية وتوصيله بنظام الاتصالات وأرشفة الصور (نظام باكس) نظام المعلومات بالمستشفى.
إضافة أشعة الرنين المغناطيسي إلى قسم الأشعة التشخيصية من أجل القيام بكافة الإجراءات العصبية والعضلية والعظمية.
يعمل قسم الأشعة التشخيصية طوال اليوم لاستيعاب عدد أكبر من المرضى وليتجنب الازدحام خلال ساعات الذروة.`,
        E_DESCRIPTION: `<p>Include Diagnostic X-Ray Procedures, Mammography, CT Scanning & Diagnostic Ultrasound studies constitute the majority of the daily procedural load. Services related or concomitant to imaging include quality assurance monitoring and evaluation, quality control (including protecting patients and staff from harmful radiation), image interpretation, transcription, record filling/management and continuing education.</p>

<customel>Portable X-Ray</customel>
<p>Portable X-Ray equipments allow radiographs to be obtained in surgery as well as medical/surgical and intensive care section
Caters diabetic patients, Thyroid Disorders, Growth Disorders in children, Pituitary Disorders, Reproductive Endocrinology, Excessive Weight Gain (Obesity) and Endocrine Hypertension. Metabolic Bone Disease are catered by Consultants with facilities for estimation of Bone Mineral Density (BMD) and monitoring of therapy for osteoporosis.</p>

<customel>Two C-Arm machines</customel>
<p>Two C-Arm machines in the OR for Orthopedics and Urological procedures.</p>

<customel>MRI</customel>
<p>MRI is also added on Diagnostic Imaging department to accommodate Neurological, Musculo-skeletal procedures.</p>

<customel>Digital Panoramic</customel>
<p>DigitalPanoramic is being installed and connected to PACS/HIS to easily access to the dental clinic.</p>

<customel>Diagnostic Imaging</customel>
<p>Diagnostic Imaging Department is now 24 hours service to accommodate more patients and avoid overcrowding during rush hour.</p>`,
        image: "therapeutic",
        SHOWASHTML: i18n.locale !== 'ar',
        icon: <MaterialCommunityIcons name="skull-scan-outline" size={iconsize} color={colors.darkGrey} />
    },
    {
        E_NAME: "CLINICAL LABORATORY SERVICES",
        A_NAME: "الخدمات الإكلينيكية للمختبر",
        A_DESCRIPTION: `<p>تقدم الخدمات المخبرية مجموعة كاملة من الفحوصات وتشتمل على الفروع التالية:</p>

<customel>تشريح الأنسجة المرضية</customel>
<p>يقدم قسم التشريح وقسم علم الخلايا عالم الباثولوجي التشريحي والكيمياء المناعية للخلايا وخدمات علم الخلايا وتحليل صور الحامض النووي (دي. إن. أيه).</p>

<customel>علم الميكروبات</customel>
<p>فصل البكتريا المرضية والبكتريا الفطرية والفطريات من جميع الأجسام الموجودة فيها باستخدام أدوات معدة في المختبروالقيام بتحديد نوعية المضاد الحيوي المناسب أوتوماتيكياً مع المراقبة الأوتوماتيكية لمزرعة الدم.</p>

<customel>الكيمياء الحيوية</customel>
<p>يتعامل هذا الفرع مع كيمياء الدم والسوائل باستخدام طرائق عديدة ومقننة في آلات أوتوماتيكية فضلاً عن توافر الغازات وتركيز المواد في السوائل.</p>

<customel>علم الأمصال وعلم الهرمونات</customel>
<p>فحص شامل ومقاييس كمية لجميع الإصابات ودلالات الأورام وأنواع معينة من البروتينات باستخدام نظام المختبر الأوروبي لتقدير البنيات والأجهزة الأوتوماتيكية المغلفة واختبار التألق المناعي. تٌنفذ جميع الهرمونات باستخدام اللمعان الكيميائي.</p>

<customel>علم الدم و بنك الدم</customel>
<p>يقدم قسم بنك الدم خدمات الدعم على مدار الساعة فضلاً عن ضرورة أن يجيب كل متبرع بالدم على الاسئلة المشتملة في استبيان شامل فضلاً عن الخضوع لاختبارات فحص الدم الشامل واختبار أي أل تي ALT واختبار أجسام المضادة لفيروس بي واختبار نقص المناعة المكتسبة</p>`,
        E_DESCRIPTION: `<p>Laboratory services provide a wide range of investigation and comprises of the following disciplines:</p>

<customel>Hmatology & Blood Bank</customel>
<p>Hmatology & Blood Bank Blood Bank Section is full pledged, 24 hours, support service. Each blood donor has to answer a comprehensive questionnaire and is screened for CBC, ALT, HbcAb, HIV, Hepatitis B, Hepatitis C, HTLV I& II, Syphilis, Brucellosis and Malaria. It deals with the transfusion of compatible blood and its components. The components prepared at the moment are: Packed RBC’s, Fresh Frozen Plasma (Platelet concentrates, Platelet Rich Plasma, Cryoprecipitate will be available in near future). Other blood bank services include study of blood groups, direct and indirect coombs test, antibody screening and typing, investigation of ABO RH incompatibility and detection of phenotypes and genotypes of Rh system. Two 5 differential CBC machines serve the Hematology Section together with slide consultation, bone marrow examination and Malaria screening.</p>

<customel>Microscopy</customel>
<p>Microscopy Comprehensive examination of Urine, Stool, Body Fluids and Semen is carried out.</p>

<customel>Nucleic Acid Test (NAT)</customel>
<p>Nucleic Acid Test (NAT) Test for HIV, HBV & HCV are done by methods based on PCR to shorten the window period of blood donors.</p>

<customel>Histopathology</customel>
<p>The Histopathology and Cytology sections provide Anatomic Pathology, Immunohistochemistry, Cytology services and DNA Image Analysis.</p>

<customel>Microbiology</customel>
<p>Microbiology Isolating Pathological Bacteria, Mycobacteria and Fungi from all body sites using in-houseprepared media and performing identification and antibiogram using an Automated System together with a Blood Culture Automatic Monitor.</p>

<customel>Biochemistry</customel>
<p>Deals with the chemistry of blood and fluids using variable standardized technique over automated machines. Blood gases and osmolality are available.</p>

<customel>Serology & Hormonology</customel>
<p>Comprehensive screening and quantitative measurements of all infections, tumor markers and specific proteins using an Open ELISA System, closed automated instruments and IFAT. All hormones are performed using automated chemiluminescence.</p>`,
        image: "clinical_lab_services",
        SHOWASHTML: true,
        icon: <MaterialCommunityIcons name="bandcamp" size={iconsize} color={colors.darkGrey} />
    },
]
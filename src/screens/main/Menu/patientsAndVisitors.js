import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../../services';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';


const iconsize = 25;
export const subMenuPatientsAndVistors = () => [
        {
                E_NAME: "Patients Rights",
                A_NAME: "حقـــــوق المريض",
                SHOWASHTML: true,
                E_DESCRIPTION: `<customel>Respect</customel>
The patient will be treated with consideration, respect, and full recognition of his dignity and individuality, including privacy in treatment, personal care and respecting personal value and belief. The patient will be free from all forms of abuse and harassment. The patient has the right, if disabled, to receive appropriate additional care to compensate for his/her disability. The patient will be protected from verbal abuse by physicians, nurses, or any other hospital staff.

<customel>Consent & Refusal of Treatment</customel>
The patient has the right to make informed decisions about his/her care based on information from the professional performing the procedure including information about the proposed procedure, risk and benefits, additional procedures which may become necessary, long term consequences, risks of no treatment and possible alternative treatments available including treatment options not available in the hospital. The patient, if deemed mentally competent has a right to refuse treatment and to be informed of the medical consequences of such refusal. The patient’s written consent must be obtained prior to photography especially the face.

<customel>Pain Management</customel>
The patient has a right to appropriate assessment and management of his or her pain/discomfort.

<customel>Communication</customel>
The patient will be free to communicate with, associate with, and meet privately with anyone, Including family and friends, unless to do so would infringe upon the rights of other patients. The patient will be provided interpreters if he/she cannot understand the language of the caregiver. The patient will be allowed to refuse to talk to any individual that has no relationship to the care provided including the patient’s visitors.

<customel>Complaints</customel>
The patient has the right to be informed about the complaint process. The patient has the right to submit complaints or grievances regarding any aspect of care or service free from restraint, interference, coercion, discrimination or reprisal. The patient will have the right to a timely and fair review of the grievance and will be provided a written notice of the hospital’s decision.

<customel>Restraint</customel>
The patient will be free from chemical and physical restraints except when they are deemed necessary to protect the patient or others from injury and authorized in writing by a physician for a specific and limited time.

<customel>Privacy</customel>
The patient has a right to personal privacy and will be entitled to define preferences for visits. The patient has a right to be interviewed and examined in privacy and to have a chaperone present of his choice present during physical examinations.

<customel>Information</customel>
The patient will be fully informed verbal of his/her rights and responsibilities and of all procedures governing patient conduct and responsibilities.
The patient will be fully informed by a health care provider on his/her health condition.
The patient will be fully informed of his/her financial obligations and the cost of services to be provided if any.
The patient is truthfully informed when his/her needs exceed the hospital’s capability for care.

<customel>Safety & Security</customel>
The patient is entitled to expect the best possible level of safety regarding the hospital environment and the conduct of medical procedures and interventions.

<customel>Access to Care</customel>
The patient will not be denied from appropriate care on the basis of race, religion, color, national origin, sex, age, disability, marital status, or source of payment. The patient has the right to be provided with continuous and organized healthcare at all levels of treatment.

<customel>Confidentiality</customel>
The patient will be ensured confidential treatment of all information contained in his/her personal and clinical record.
The patient will be entitled to summaries of such records.
The patient’s written consent will be required for the release of information to anyone not otherwise authorized by the patient to receive it.
The patient has the right to ensure complete confidentiality of all his/her treatment by never been discussing the patient in public, never revealing the patient name or any information about his/her illness, and not publicizing any information.

<customel>Substitute Decision-making</customel>
The patient has the right to inform his/her healthcare providers of his/her healthcare decisions in advance to be carried out if he/she is incapacitated.
The patient has the right to appoint a substitute decision maker upon admission to make health care decisions on his/her behalf to the extent permitted by law, if he/she chooses not to or if is incapacitated.`,
                A_DESCRIPTION: `<customel>الاحترام</customel>
ستتم معالجة المريض مع المراعاة والاحترام وكامل التقدير لكرامته وشخصيته المستقلة ، بما في ذلك الخصوصية في العلاج والرعاية الشخصية ، خاصة المرضى من ذوي الاحتياجات الخاصة .
لن يتعرض المريض لأي نوع من أنواع الإيذاء الجسدي أو التحرش الجنسي كما لن يسمح بمعاملة المريض بشكل غير لائق من قبل أي شخص

<customel>الموافقة على العلاج ورفضه</customel>
للمريض الحق في اتخاذ القرارات فيما يتعلق برعايته بناءً على المعلومات التي يحصل عليها من الموظف المختص بتقديم الخدمة يشمل ذلك المعلومات المتعلقة بالإجراء المقرر اتخاذه والمخاطر المحتملة والفوائد والإجراءات الإضافية التي قد يكون من الضروري اتخاذها والعواقب طويلة الأمد والمخاطر التي قد تنجم عن عدم الحصول على العلاج والطرق العلاجية البديلة الممكنة والمتاحة ، بما في ذلك خيار العلاج غير المتاح بالمستشفى
هذا إذا كانت الحالة العقلية للمريض تسمح له باتخاذ هذه القرارات ، كذلك من حق المريض أن يرفض ذلك العلاج وأن يتم إخطاره بالعواقب الطبية لهذا الرفض .

<customel>التحويل او الخروج</customel>
يجب أن يكون تحويل أو خروج المريض من المستشفى بعد وضع خطة ملائمة للخروج ولأسباب طبية فقط .
يجب إخطار المريض بأسباب التحويل وبالإجراءات المتخذة لتسهيل عملية التحويل

<customel>حـرية الاتصـــال</customel>
يجب أن يكون للمريض حرية الاتصال بأي شخص أو مرافقته أو مقابلته على انفراد بما في ذلك أفراد العائلة والأصدقاء ، في حدود احترام حقوق الآخرين .
كما يتم توفير المترجمين للمريض إذا لم يكن بإمكانه فهم اللغة التي يتحدثها الشخص القائم على رعايته.

<customel>الشكاوى</customel>
للمريض الحق في أن يتم إخطاره بما يخص مسار شكواه .
للمريض الحق في تقديم الشكاوى في المدة المحددة وفق نظام المستشفى فيما يتعلق بأي شكل من أشكال الرعاية أو الخدمة دون التعرض لأي قيود أو تدخل أو إكراه أو تمييز .
وكذلك للمريض الحق في أن يتم استعراض شكواه في الوقت المناسب وبشكل عادل وحصوله على رد بالقرار الذي توصل إليه المستشفى بشأن شكواه .
يتمتع المريض بالحق في طرح التساؤلات وحصوله على الإجابات وفقاً لذلك .

<customel>القيود</customel>
يجب ألا يتعرض المريض لقيود دوائية وجسدية إلا إذا اعتقد الأطباء أن ذلك الإجراء ضروري لحماية المريض أو لحماية الآخرين على أن يكون تصريح الأطباء بذلك كتابياً وبإشراف طبي متكامل ومتواصل ولفترة زمنية محددة .

<customel>الخصــــــوصية</customel>
للمريض الحق في أن تكون له خصوصيته الشخصية ويجب أن يتمتع بالحق في تفضيل الزيارة من عدمها .
للمريض الحق في أن تتم مقابلته وفحصه على انفراد أو أن يختار مرافقاً يتواجد أثناء إجراء الفحوص الجسدية عليه .

<customel>الحصول على المعلومات</customel>
سيتم إخطار المرضى في صيغة شفهية بكامل حقوقهم ومسؤولياتهم وما يترتب على ذلك من نتائج .
سيتم إخطار المريض بكل ما يتعلق بحالته الصحية ، وذلك عن طريق الموظف المختص بتقديم الخدمة .
سيتم إخطار المريض بكل شيء عن التزاماته المالية التي يمكن تحديدها مسبقاً وما قد يضاف إليها لاحقاً من خدمات قد تستدعيها ضرورة العلاج .
سيتم إخطار المريض بأمانة في حالة ما إذا كانت احتياجاته تتخطى إمكانات الرعاية بالمستشفى .

<customel>الأمن والسلامة</customel>
للمريض الحق في توقع أفضل مستوى ممكن من السلامة فيما يتعلق ببيئة المستشفى والسلوك المتبع في الإجراءات الطبية . وكذلك حمايته كمريض بغض النظر عن فئته العمرية من التعرض للمضايقات أو العنف أو الإيذاء ، كما يوفر المستشفى حماية خاصة للمواليد الجدد عبر تطبيق أفضل معايير الأمن والسلامة المطبقة في هذا الشأن .

<customel>الحصول على الرعاية</customel>
يجب أن لا يحرم المريض من الرعاية الملائمة على أساس العِرق أو الدين أو العادات أو اللون أو الجنسية أو الأصل أو الجنس أو السن أو الإعاقة أو الحالة الزوجية أو مصدر الدخل أو نوع تغطية التكاليف العلاجية . سيحصل جميع المرضى على علاج طبي متساوٍ بالنسبة لنفس التشخيص واحتياجات الرعاية الصحية .
يتمتع المريض بحق المطالبة بالرعاية الإضافية في حال إعاقته ، مثل الكراسي المتحركة أو ما إلى ذلك ، وذلك لتعويض إعاقته .

<customel>السرية</customel>
يجب الحصول على موافقة كتابية من المريض قبل تصويره ( خاصة تصوير الوجه ) .
يجب ضمان التعامل بسرية مع جميع بيانات المريض الموجودة في ملفه الطبي عن طريق عدم مناقشة بياناته أمام الآخرين فيما يخص هذه البيانات وعدم الإفصاح عن اسمه عند الحديث عن أي معلومات متعلقه بمرضه .
للمريض الحق في الحصول على تقرير طبي .
يجب الحصول على تفويض مكتوب من المريض قبل إعطاء أي معلومات عن حالته الراهنة لأي شخص .

<customel>البديل في اتخاذ القرارات</customel>
للمريض الحق في إخطار مقدم الرعاية الصحية له بقراره المتخذ سلفاً فيما يتعلق برعايته الصحية والذي ينبغي العمل به في حالة فقدانه للقدرة على اتخاذ القرار .
عند دخول المريض للمستشفى ، يكون لديه الحق في تعيين شخص بديل يقوم باتخاذ القرارات المتعلقة برعايته الصحية نيابة عنه وفي حدود ما يسمح به النظام ، ذلك في حال لم تكن لديه القدرة على اتخاذ القرار .

`,
                icon: <MaterialCommunityIcons name="note-text-outline" size={iconsize} color={colors.darkGrey} />
        },
        {
                E_NAME: "Patients Public Relations",
                A_NAME: "علاقات المرضى و الخدمات الإجتماعية",
                SHOWASHTML: true,
                E_DESCRIPTION: `Since our patients are our primary concern, we want to make your visit to United Doctors Hospital as pleasant as possible. We are very interested in your suggestions or concerns about any aspect of our service.
If your suggestions or concerns are related to an inpatient stay, please do not hesitate to contact the Head Nurse or Nurse In-charge of the unit on which you received your care. If your comments are related to a Physician or other outpatient facility, please feel free to contact the Head of the concerned department.
And, if you need help in determining who would best address your suggestions, comments or concerns, our Patient Relation Officer is happy to assist. You can reach the Patient Relation Officer through Patient Affairs Department at extension 1339, from 0900H 1700H, Saturday through Thursday except Friday.

<customel>United Doctors Hospital Patient Affairs aims to</customel>
<ul>
<li>Advise and support patients and their families.</li>
<li>Provide information on the hospital services.</li>
<li>Listen to and respond to your concerns, suggestions or queries.</li>
<li>Influence changes in the service.</li>
</ul>
<customel>Patient Relation Standards</customel>
<ul>
<li>Patient is relation is committed to provide a high quality standard of care within its resources.</li>
<li>Patient Relation develops its own standards as required by the patients, public and staff that it serves.</li>
<li>Patient Relation welcomes constructive feedback.</li>
</ul>
<customel>The UDH Patient Relation is responsible of</customel>
<ul>
<li>Seeking out views of patients’ through daily visits.</li>
<li>Addressing any queries by communicating with the Department Head or Supervisor of the concerned unit or department.</li>
<li>Collecting and responding to comments through hospital questionnaires.</li>
<li>Providing early solutions to problems and concern in coordination with the Duty Manager and the Patient Complaints Committee.</li>
<li>Supporting Patient Rights.</li>
<li>Providing information and support to access other information including the Patient Complaint Procedure and any aspect of the hospital services.</li>
<li>Liaison between professionals for patients.</li>
<li>Auditing comments to pick up trends and influence changes required for improvements in coordination with the Patient Complaints Committee.</li>
<li>Supporting patients and public involvement in care.</li>
<li>Raising staff awareness of public concerns and issues.</li>
</ul>`,
                A_DESCRIPTION: `بما أن المريض هو اهتمامنا الرئيسي فنحن نريد أن نجعل زيارتكم إلى مستشفى الأطباء المتحدون سعيدة بقدر الإمكان. ونهتم جداً باقتراحاتكم أو اهتماماتكم حول أي جانب من جوانب الخدمة المقدمة إليكم.
<ul>
<li>إذا كانت اقتراحاتكم أو اهتماماتكم ترتبط بالإقامة في القسم الداخلي ، من فضلكم لا تترددوا في الاتصال بقسم علاقات المرضى تحويلة 1155 أو الممرضة المسؤولة عن الوحدة التي تتلقون رعايتكم داخلها.</li>
<li>أما إذا كانت تعليقاتكم ترتبط بطبيب العيادة الخارجية أو غيرها من المرافق ، فمن فضلكم لاتترددوا  في الاتصال برئيس قسم علاقات المرضى تحويلة 1155.</li>
<li>أما إذا كنتم في حاجة إلى مساعدة  في تحديد من تقدمون له اقتراحاتكم، تعليقاتكم أو اهتماماتكم،  فإن المدير المناوب سوف يكون سعيداً بمساعدتكم. و يمكنكم الوصول إليه في أي وقت على مدار اليوم.</li>
</ul>
<customel>تهدف شؤون المرضى في مستشفى الأطباء المتحدون إلى :</customel>

<ul>
<li>تقديم النصح والدعم للمرضى وأسرهم.</li>
<li>تقديم معلومات عن خدمات المستشفى.</li>
<li>الإصغاء والاستجابة لاهتماماتك، اقتراحاتك أو تساؤلاتك.</li>
<li>إحداث التغييرات في الخدمة المطلوبة بناءً على اقتراحاتكم</li>
</ul>

<customel>يتحقق السعي إلى حصول المريض على حقوقه من خلال :</customel>
<ul>
<li>تقديم المعلومات ودعم الوصول إلى المعلومات بما في ذلك إجراءات شكاوى المريض أو أي خدمات أخرى داخل المستشفى</li>
<li>تكامل حلقة الوصل بين المرضى ومقدمي الخدمة من أطباء وطواقم تمريض وغيرهم داخل المستشفى .  </li>
<li>مراجعة ملاحظات وآراء الزوار لانتقاء أفضل التغييرات الممكن إجراؤها لتحسين خدمة المرضى وذلك بالتنسيق مع لجنة شكاوى المرضى .</li>
<li>دعم المرضى والمشاركة العامة في الرعاية.</li>
<li>رفع مستوى وعي طاقم العمل بالاهتمامات العامة والقضايا التي تخص المريض.</li>
</ul>
<customel>قسم علاقات المرضى في مستشفى الأطباء المتحدون مسؤول عن :</customel>
<ul>
<li>معرفة آراء المرضى من خلال زيارات يومية.</li>
<li>الرد على أي تساؤل بالاتصال برئيس القسم أو المشرف على الوحدة أو القسم المختص.</li>
<li>جمع الاستبيانات الخاصة بالمستشفى والرد على التعليقات الواردة فيها .</li>
<li>تقديم حلول للمشاكل في وقت مبكر والاهتمام بالتنسيق مع المدير المناوب ولجنة شكاوى المرض  .</li>
<li>رفع ملاحظاتكم والشكاوى المقدمة من قبلكم لإدارة المستشفى ومتابعة الردود.</li>
</ul>
<customel>معايير علاقة المريض :</customel>
<ul>
<li>بالنسبة للمريض يلتزم القسم بتقديم الرعاية له على مستوى عالٍ من الجودة وفي حدود الموارد الممكنة .</li>
<li>يطور قسم علاقات المرضى معاييره الخاصة بما يتطلبه خدمة كلًّ من المرضى والزوار وموظفي المستشفى .</li>
<li> قسم علاقات المرضى يرحب بالتعليقات البناءة</li>
</ul>
`,
                icon: <MaterialIcons name="public" size={iconsize} color={colors.darkGrey} />
        },
        {
                E_NAME: "Instructions for smoking",
                A_NAME: "التعليمات المتعلقة بالتدخين",
                E_DESCRIPTION: `Since smoking is a barrier in fulfilling our mission as a healthcare provider, many hospitals have made their facilities smoke-free, including buildings, parking lots and other properties. United Doctors Hospital is trying to impose a zero-tolerance policy towards smoking by stating that employees cannot smoke when in uniform, including when they’re wearing a hospital badge. Smoke detectors are fitted throughout the Hospital to ensure patients, visitors and staff compliance on the said policy and to make certain that our customers are safe from any fire hazards. But in most cases this doesn’t extend to their employees when they’re not at any of these facilities. Currently smoking is not allowed in our hospitals, but designated smoking areas are available.`,
                A_DESCRIPTION: `يعتبر التدخين عائقاً في تحقيق مهمتنا باعتبارنا  مقدمي الخدمة الصحية ، و في العديد من المستشفيات جعلت جميع المرافق خالية من دخان التبغ ، بما في ذلك المباني ومواقف السيارات وغيرها من الممتلكات.

يحاول مستشفى الأطباء المتحدون فرض سياسة عدم التسامح تجاه التدخين من خلال الإشارة إلى أن الموظفين لا يمكن أن يدخنوا وهم يرتدون الزي الرسمي ، كذلك وهم يرتدون  شارة المستشفى.

وتم تركيب أجهزة كشف الدخان في أنحاء المستشفى لضمان التزام المرضى والزوار والموظفين بالسياسات المعلنة تجاه التدخين  و للتأكد من أن  المرضى والزائرين والموظفين في مأمن من أي خطر يتعلق بالحرائق التي تعتبر السجائر السبب الأساسي لها.
وكخلاصة لا يسمح بالتدخين في كل مرافق المستشفى وذلك لضمان صحة و سلامة المريض.`,
                icon: <MaterialIcons name="smoke-free" size={iconsize} color={colors.darkGrey} />
        },
        {
                E_NAME: "Visit Time",
                A_NAME: "مواعيد الزيارة",
                E_DESCRIPTION: `Announcement

In compliance with new MOH regulations regarding the Novel Coronavirus (COVID19) we wish to inform you that :
1- Visiting hours for admitted patients will be restricted to one hour only from 5 pm to 6 pm.
2- Only two visitors are allowed per day and should be 1st-degree relatives.
3- Number of companions to the patient in the Out-Patient Clinics will be minimized to one adult and two children.`,
                A_DESCRIPTION: `تنبيه

تماشيا مع التعليمات الجديدة لوزارة الصحة بخصوص وباء كورونا الجديد (كوفيد 19) فقد تقرر الآتي :
1. تخفيض ساعات الزيارة للمرضى المنومين إلى ساعة واحدة فقط من الثانية عشرة إلى الواحدة ظهرا
2. تقتصر الزيارة على الأقارب من الدرجة الأولى بحد أقصى زائرين اثنين فقط
3. تقليل عدد المصاحبين لمراجعي العيادات الخارجية إلى مرافق واحد من البالغين و اثنين من الأطفال بحد أقصى`,
                icon: <Ionicons name="time-outline" size={iconsize} color={colors.darkGrey} />
        },
        {
                E_NAME: "Catering services",
                A_NAME: "خدمات الطعام",
                E_DESCRIPTION: `United Doctors Hospital food service is providing optimum nutritional care and food service to patients in convalescence, for their guest and staff’s through the Dietary unit, production unit and service unit. Food service is extended twenty-four hours a day with breakfast, orders like oriental, continental and Asian cuisines from the room service menu book is served round the clock in an appetizing manner as room service.

The Food service department is functional as production unit and service unit. The Food service production unit including chef’s assistant chef’s, kitchen cleaners. The service unit includes diet technician, Room service supervisors and pantry supervisors and pantry assistants with in the related job functions.

Food service department of the united doctors hospital is proud for being the leaded among hospitals, in maintaining high quality hospitality service in Jeddah and Makkah regions.`,
                A_DESCRIPTION: `يفتخر مستشفى الأطباء المتحدون بريادته بين المستشفيات في الحفاظ على تقديم خدمة طعام عالية الجودة .

تقدم خدمة التغذية في مستشفى الأطباء المتحدون رعاية صحية غذائية مثالية  لكل المرضى في مرحلة الاستشفاء، بالإضافة للضيوف ولطاقم العمل من خلال وحدة تغذية متكاملة تشمل وحدة إنتاج ووحدة خدمة.
تمتد خدمة التغذية و الطعام أربعاً وعشرين ساعة يومياً ابتداءً من وجبة الإفطار ، مع توفير أنواع مختلفة من المأكولات العربية و الشرقية (أورينتال) والعالمية( كونتيننتال ) و الآسيوية وكل ذلك موجود في كتاب قائمة خدمة الغرف و يقدم طازجاً طوال اليومبطريقة شهية.
يعمل قسم خدمة الطعام على توفير وحدتين أساسيتين هما وحدة إنتاج ووحدة خدمة. حيث تشتمل  وحدة إنتاج الطعام على طهاه مساعدين للطاهي الرئيس ومنظفين للمطبخ ، في حين تشتمل وحدة الخدمة على فنّي تغذية ، بالإضافة إلى مشرفيخدمة غرف ومشرفي تخزين الطعام ومساعدي خزانة طعام مع وظائف أخرى  مرتبطة بذلك.`,
                icon: <MaterialCommunityIcons name="room-service-outline" size={iconsize} color={colors.darkGrey} />
        },
];
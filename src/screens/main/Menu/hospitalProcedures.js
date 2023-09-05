import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../../services';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const iconsize = 25;

export const subMenuHospitalProcedures = () => [
        {
                E_NAME: "ADMISSION PROCESS",
                A_NAME: "تعليمـات تسجيـل الدخـول",
                E_DESCRIPTION: `Once the physician has admitted the patient to the United Doctors Hospital, the relevant hospital rules and regulations will be applied where:
At the Admission office, the patient will be required to provide personal information and to sign a General Consent Form before being taken to the ward.

If the patient is incapable then, information is obtained from a family member.

The patient will be placed in the assigned room and will be given necessary treatment and care by the attending Physician and Nurses.

Our dedicated team of professionals is prepared to make your stay comfortable. It is our objective to meet your physical, emotional needs and treat you with dignity, care and respect.`,
                A_DESCRIPTION: `لاستيفاء إجراءات الدخول وبمجرد أن يقوم الطبيب بإدخال المريض لمستشفى الأطباء المتحدون، سيتم تطبيق لوائح وأنظمة المستشفى المتعلقة بذلك حيث:
سيطلب من المريض عند الدخول تقديم معلومات شخصية .

توقيع بعض نماذج التعهد قبل الدخول للقسم.

إذا كانت حالة المريض حرجة جداً لا تسمح بحصول المستشفى على المعلومات اللازمة منه شخصياً فسيتم الحصول على هذه المعلومات من الفرد المرافق له أو أحد أفراد عائلته المرافقين.

سيتم إلحاق المريض بالغرفة المخصصة له وسوف يعطى العلاج الضروري والرعاية اللازمة بواسطة الطبيب المعالج وطاقم التمريض .

لدينا فريق متخصص على استعداد تام لتقديم إقامة مريحة لك ، وهدفنا من ذلك هو تلبية احتياجاتك البدنية والعاطفية مع الرعاية والاحترام .`,
                icon: <MaterialCommunityIcons name="domain-plus" color={colors.darkGrey} size={iconsize} />,
                iconDetail: {
                        container: "MaterialCommunityIcons",
                        name: "domain-plus"
                }
        },
        {
                E_NAME: "DISCHARGE PROCESS",
                A_NAME: "إجــراءات تسجيـل الخـروج",
                E_DESCRIPTION: `The attending physician ensures that the patients discharge needs are met.
Communicates the patient’s readiness for discharge to concerned hospital staff and ensures that continuity of care must be followed after discharge.

The attending physician educates the patients prior to discharge about his/her illness and to provide proper self care.

The physician provides the patient with complete information about aftercare and therapeutic advice at home as follows:
Times to take medications and any special instructions.

Any equipment that the patient might use at home.

When to call the physician and how to obtain urgent care.

The attending physician ensures that continuity of care occurs after discharge by:
Assigning the follow up appointment for the patient (appointment card is being provided)

Arranging referral services to the patient

Communicating with other receiving physicians in case of transfer.

Questions the patient should ask before going home:
Does he/she need to come back to be re-checked? Who should he/she see?

What health problems should the patient watch for at home?

Have medications been prescribed? What are they and what are they for?

Are there any side effects to the medications? If so, should the patient stop taking the medications?

Any food restrictions and physical activities that should be considered?`,
                A_DESCRIPTION: `عملية خروج المريض من المستشفى أصبحت في الطب الحديث من الأجزاء الرئيسية في منظومة علاج المريض، وفيما يلي الإجراءات التي تنص عليها لوائح مستشفى الأطباء المتحدون فيما يخص عملية الخروج:
يتأكد الطبيب المعالج أن متطلبات خروج المريض قد تم تحقيقها ويتم إخبار المريض بذلك ليستعد ويتهيأ للخروج من المستشفى والذهاب إلى المنزل ، كما يتأكد طاقم العمل بالمستشفى من استمرارية الرعاية اللاحقة بعد خروج المريض من المستشفى.

يُعلم الطبيب المعالج مريضه قبل الخروج من المستشفى بطبيعة مرضه .

يقدم الطبيب لمريضه المعلومات الكاملة عن الرعاية اللاحقة والنصائح العلاجية في المنزل وهي كالتالي :
الوقت المخصص لتناول العلاج وكيفية تناوله.

شرح الأدوات التي يستخدمها المريض في المنزل.

شرح التعامل مع الأزمات الطبية العاجلة ، وكيف يحصل على رعاية طارئة

يؤكد الطبيب المعالج استمرار الرعاية بعد الخروج من خلال :
تعيين مواعيد المتابعة للمريض.

ترتيب خدمات تحويل المريض إذا لزم الأمر.

الاتصال مع أطباء آخرين للاستقبال في حالة النقل.

أسئلة يجب أن يسألها المريض لطبيبه قبل العودة للمنزل :
أهل يحتاج أن يعود ليتم إعادة فحصه؟ من يقوم بالإجابة على استفساراته ؟

ما أنواع الأعراض التي يجب أن يراقبها المريض في المنزل؟

ما هي العلاجات التي توصف؟ ولماذا تم وصفها؟

هل يوجد أي تأثيرات جانبية للعلاج؟ و هل يجب أن يوقف المريض العلاج حال حدوثها ؟

هل هناك قيود على أنواع معينة من الطعام أو الأنشطة البدنية يجب أخذها في الاعتبار؟.`,
                icon: <MaterialCommunityIcons name="bank-minus" color={colors.darkGrey} size={iconsize} />,
                iconDetail: {
                        container: "MaterialCommunityIcons",
                        name: "bank-minus"
                }
        },
        {
                E_NAME: "PATIENT PRIVACY",
                A_NAME: "سرية معلومـات المريـض",
                E_DESCRIPTION: `Our commitment and duty to maintaining the privacy of patient information:
The patient shall be ensured confidential treatment of all information contained in his personal and clinical record.

The patient shall be entitled to summaries of such records.

The patient’s written consent shall be required for the release of information to anyone not otherwise authorized by the patient to receive it. Only minimum information is released which is necessary for the purpose.

The patient will be explained about the circumstances in which it is needed to share information about them with others involved in their healthcare.

The patient will be given opportunity to withhold permission from us to share information.

The patient has the right to ensure complete confidentiality of all his/her treatment by never been discussing the patient in public, never revealing the patient name or any information about his illness, and not publicizing any information.

Preventing information from being accidentally revealed and prevent unauthorized access by keeping information secure at all times.

In exceptional circumstances, it may be justified to make confidential patient information known without consent if, it is in the public interest or the patient’s interest

We, as a staff of United Doctors Hospital have both an ethical and a legal duty to keep the patient information confidential.
If a patient allows to share information, we make sure:
We will share with the patient what will be release?

The reason for releasing it

The likely consequences of releasing information`,
                A_DESCRIPTION: `الحفاظ على خصوصية معلومات المرضى:

يتعامل المستشفى مع معلومات المرضى بسرية تامة ، حيث يتم استخدامها للأغراض المطلوبة لها فقط .

يهتم المستشفى بالحفاظ على المعلومات من الظهور سهواً .

يهتم المستشفى بوقاية معلومات المريض من الوصول إليها بغير الطرق الرسمية ..

يهتم المستشفى ببقاء المعلومات آمنة في كل الأوقات إلا في بعض الظروف الاستثنائية

نحن كطاقم عمل في مستشفى الأطباء المتحدون نملك كلاً من الواجب الأخلاقي والقانوني للحفاظ على معلومات المريض وبقائها خاصة ، كما هو متعارف عليه من خلال القواعد الأخلاقية حول حماية خصوصية معلومات المريض.
التزامنا وواجبنا تجاه المحافظة على خصوصية معلومات المريض :

سوف تحفظ معلومات المريض بسرية تامة

السرية مركزية في علاقة الثقة بيننا وبين مريضنا.

يطبق واجب السرية على كل أعضاء المستشفى.

تحفظ المعلومات بشكل سريحتى بعد وفاة المريض لا قدر الله.

إذا كان من الضروري الإعلان عن معلومات مريض : سوف تُؤخذ موافقة المريض قبل ذلك.

يتم عرض المعلومات المحددة والتي هي مطلوبة لهذا الغرض دون التطرق إلى جميع المعلومات.

سوف يفسر ويوضح للمريض الظروف التي بموجبها تم طلب مشاركة معلوماته مع جهات أخرى مشتركة في الرعاية الصحية.

سوف يأخذ المريض الفرصة في عدم موافقته من أن نشارك المعلومات مع جهات أخرى.

عند سماح المريض لنا بمشاركة معلوماته مع جهات أخرى، نحن نؤكد التالي :
سوف يتم إعلام المريض بما سيتم إفصاحه ومشاركته من معلومات .

أسباب الإفصاح

التبعات والنتائج المحتملة للإفصاح عن المعلومات`,
                icon: <MaterialCommunityIcons name="bed-outline" color={colors.darkGrey} size={iconsize} />,
                iconDetail: {
                        container: "MaterialCommunityIcons",
                        name: "bed-outline"
                }
        },
        {
                E_NAME: "PATIENTS SATISFACTION",
                A_NAME: "تقدير وقياس رضا المرضى",
                E_DESCRIPTION: `We belive that the patient satisfaction and patient perceptions of outcomes have become valuable and important components in the assessment of the quality of health care.

Patients are uniquely able to provide information about their ease or difficulty of obtaining care, the interpersonal dimensions of the patient and physician relationship. The patient’s view of the technical quality of care provided, and the patient’s functional status and perceived wellbeing.

It is the responsibility of the United Doctors Hospital to give high quality care and services to the patients and measure the quality and satisfaction of the patients in order to improve the quality of care and services.

The Patient Relation Officer /social worker will give each patient the satisfaction questionnaire during their daily patient rounds.

The Patient Relation Officer /social worker will kindly ask the patient to fill the patient satisfaction questionnaire and explain how important their input. Your opinion is confidential. We value and appreciate your feedback.`,
                A_DESCRIPTION: ` نؤمن بأن رضا المريض واطِّلاعه على نتائج الخدمة المقدمة له من أهم العناصر في تقييم جودة الرعاية الصحية.

نعتقد أن المرضى قادرون بصورة فردية على تقديم معلومات حول راحتهم أو صعوبة حصولهم على الرعاية وكذلك عن الأبعاد الشخصية لعلاقة المريض- الطبيب، وعن نظرة المريض للجودة الفنية للرعاية المقدمة ، والحالة المرضية للمريض.

مسؤوليتنا في مستشفى الأطباء المتحدون هي تقديم رعاية وخدمات ذات جودة عالية للمرضى وقياس هذه الجودة ورصد رضا المرضى وذلك لتحسين جودة الرعاية والخدمات.

سوف يقوم الموظفون أو الأخصائيون الاجتماعيون المختصون بالمرضى بتوزيع استبيان قياس الرضا على جميع المرضى خلال الجولة اليومية ، وسيطلب من كل مريض تعبئة الاستبيان وسيفسر له درجة أهمية ملاحظاته.

سوف يتم سؤال المريض عمّا يلي :سبب اختيار مستشفى الأطباء المتحدون ، عدد مرات دخوله في مستشفى الأطباء المتحدون ، عملية الدخول والخروج، خدمة الطعام وجودة الطعام ، التمريض، العلاج الطبي وعملية الخروج.

سوف يجمع الموظف أو الأخصائي الاجتماعي المختص بالمريض استبيان قياس رضا المريض من المرضى أو من خلال الممرضة قبل خروج المريض.`,
                icon: <Ionicons name="ios-bed-outline" color={colors.darkGrey} size={iconsize} />,
                iconDetail: {
                        container: "Ionicons",
                        name: "ios-bed-outline"
                }
        },
        {
                E_NAME: "COMPLAINTS & SUGGESTION",
                A_NAME: "تقديم الشكاوى والإقتراحات",
                E_DESCRIPTION: `We will do our best to provide you with the highest level of medical, nursing and other services. However, if we do not meet your expectations please do not hesitate to exercise your right to complain.The patient has the right to be informed about the complaint process.

Complaint could be received by the Patient Relation Officer, Social Worker or Duty Manager.

The matter will be investigated and will be taken seriously by the Patient Care Committee.

Acknowledgement of the complaint will be made to the patient by the Patient Care Committee Coordinator.

The patient will be provided a written notice of the hospital’s reply about the complaint.

The patients, relatives & visitors have the right to Complaint regarding any aspect of service provided.
`,
                A_DESCRIPTION: `يبذل المستشفى قصارى جهده لتوفير أعلى مستوى من الخدمة الطبية والتمريض وغيرها من الخدمات ، ووغم ذلك إذا شعرت بنوع من عدم الرضا أو الاقتناع بالخدمة المقدمة من المستشفى أو من أحد كوادرنا فلا تتردد في ممارسة حقك في تقديم شكواك أو اقتراحك ، فهذه الشكاوى والاقتراحات تساعد المستشفى على تقديم أجود خدمة ممكنة من خلال تصحيح الخطأ والتطلع للأفضل ، وللمريض الحق في متابعة هذه الشكوى .

يمكن تقديم شكوى شفهية، أو شكوى خطية أو عبر أجهزة الخدمة الذاتية والمنتشرة في الاستقبال الرئيسي وعند مداخل المستشفى وعند مدخل الطوارئ وذلك عن طريق تعبئة النموذج الخاص بالشكوى.

سيتم التحقيق في الشكوى وسوف تُؤخذ على محمل الجد من قبل لجنة رعاية المرضى .

سوف يتم تقديم شكر وتقدير للمريض على الشكوى المقدمة من قبل منسق لجنة رعاية المرضى .

يتم الرد على المريض في أسرع وقت ممكن ، من خلال مسؤول علاقات المرضى .

للمرضى والأقارب والزوار الحق في تقديم الشكاوى والاقتراحات بخصوص أي جانب من جوانب الخدمة المقدمة.`,
                icon: <Ionicons name="chatbox-ellipses-outline" color={colors.darkGrey} size={iconsize} />,
                iconDetail: {
                        container: "Ionicons",
                        name: "chatbox-ellipses-outline"
                }
        },
];
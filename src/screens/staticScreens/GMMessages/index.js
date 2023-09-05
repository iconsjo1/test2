import React from 'react'
import { LoadingWrapper, Text } from '../../../components';
import { Image, ScrollView, View, StyleSheet } from 'react-native';
import { images, i18n, shadows, fontFamilies } from '../../../services';
import styles from './styles';
import HTML from 'react-native-render-html';
import ShadowView from 'react-native-simple-shadow-view';


const GMMessage = ({ navigation }) => {
    return (
        <LoadingWrapper header navigation={navigation}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ShadowView style={StyleSheet.flatten([shadows.lightShadowGreyLowSpread, styles().shadowContainer])}>
                    <Image source={images.gmpic} style={styles().image} />
                    <HTML
                        containerStyle={styles().description}
                        baseFontStyle={styles().description}
                        renderers={{
                            p: (htmlAttribs, children) => <View style={{ marginVertical: 5 }}>{children}</View>,
                            heading: { wrapper: 'Text', renderer: (htmlAttribs, children) => children },
                            headingsm: { wrapper: 'View', renderer: (htmlAttribs, children) => <View style={{ marginVertical: 10 }}>{children}</View> },
                            lvl1: { wrapper: 'View', renderer: (htmlAttribs, children) => <View style={styles().lvl1}>{children}</View> },
                            lvl2: { wrapper: 'View', renderer: (htmlAttribs, children) => <View style={styles().lvl2}>{children}</View> },
                            lvl3: { wrapper: 'View', renderer: (htmlAttribs, children) => <View style={styles().lvl3}>{children}</View> },
                        }}
                        tagsStyles={{
                            heading: styles().header,
                            headingsm: styles().headersm,
                            lvl1: styles().lvlText,
                            lvl2: styles().lvlText,
                            lvl3: styles().lvlText,
                            strong: styles().strong,
                        }}
                        classesStyles={{
                            "heading-text": {
                                fontFamily: fontFamilies('normalTextHeader')
                            }
                        }}
                        html={i18n.locale === 'ar' ? htmlContent.AR : htmlContent.EN} />
                </ShadowView>
                <View style={{ height: 30 }} />
            </ScrollView>
        </LoadingWrapper>
    );
}

export default GMMessage;

// const htmlContent = {
//     EN: `<heading>Welcome to UDH smart</heading>

//         <p>We are pleased to use this communication vehicle to provide information to you about our organization, services and
//             initiatives. We hope you are easily able to find all the information you want to know about United Doctors Hospital
//             with a multitude of links to answer all your healthcare needs.</p>
//         <p>United Doctors Hospital is an extraordinary organization, with an extraordinary staff, that provides extraordinary
//             care. We all strive to achieve our mission & to be an excellent healthcare organization by “Putting the Patient
//             First”.</p>
//         <p>We combine the best technology, facilities, human resources, and excellent care with the healing powers of human
//             touch, respect and dignity. We strive to provide patient centered care in a healing environment. This is not just
//             what we believe, but is what we practice.</p>

//         <headingsm>The three pillars of our management approach that we are committed to achieving it</headingsm>

//         <lvl1>To provide excellent care to our patients</lvl1>

//         <lvl2>To be an excellent organization to work for.</lvl2>

//         <lvl3>To provide our physicians an excellent organization and environment to practice</lvl3>

//         <p>The excellent experience of doctors, staff and staff, and the latest medical technology allows us to provide advanced
//             and advanced services in a suitable environment for healing, God willing.</p>

//         <p>Health care in United Doctors Hospital is more than just a treatment for health conditions. Health, wellness and
//             healing – God willing – all require a deep understanding of the strong relationship between the patient’s mind, body
//             and spirit, and this is what we believe.</p>

//         <p>Welcome to the United Doctors Hospital as visitors, patients, or applicants. I hope that your experience with us will
//             be very positive. During your tour to explore our site, do not hesitate to contact me or any of our staff to answer
//             your questions or comments.</p>



//         <strong>Best regards...</strong>

//         <p>Mr. Ali Salem Al Subai
//         <p>Director General</p>
//         <p>Tel. : 00966126533333</p>
//         <p>Ext. : 1405</p>`,


//     AR: `<heading>مرحباً بكم في موقع مستشفى الأطباء المتحدون&nbsp;على شبكـة الإنترنت .</heading>
//     <div style="font-size: 15px; line-height: 25px; text-align: justify;">
//     <p dir="rtl">يسرنا استخـدام هذه الوسيلة&nbsp;لنوفر لكم &nbsp;المعلومـات والخدمـات ونسـتقبل اقتراحـاتكم وملاحـظاتكم عن مستشفانا نتمنى لكم سهولة العثور على المعلومات التي تريدون معرفتها عن المستشفى وذلك بتصفح العديد من الروابط والصفحات الداخلية&nbsp;والاطلاع على ما يقدمه المستشفى من خدمات .</p>
//     <p dir="rtl">مستشفى الأطباء المتحدون منشأة فريدة ، فيه موظفون رائعون ، يقدمون رعاية متميزة ونلتزم جميعاً بأن نسعى جاهدين لتحقيق رسالتنا المتمثلة بالرعاية الصحية المتميزة من خلال &ldquo;وضع مصلحة المريض أولاً&rdquo; .</p>
//     <p dir="rtl">في مستشفى الأطباء المتحدون نحن نقوم بدمج أفضل التكنولوجيا والمقومات والموارد البشرية مع اللمسات الإنسانية ، والاحترام والكرامة للمريض من أجل الوصول لأفضل رعاية ممكنة للمرضى في بيئة مناسبة . وهذا الأمر ليس مجرد أمنيات ، ولكن هذا ما نمارسه فعلياً .</p>
//     <div class="vc_row wpb_row vc_row-fluid">
//     <div class="wpb_column vc_column_container vc_col-sm-12">
//     <div class="wpb_wrapper">
//     <div class="vc_row wpb_row vc_inner vc_row-fluid">
//     <div class="pstext wpb_column vc_column_container vc_col-sm-12">
//     <div class="vc_column-inner">
//     <div class="wpb_wrapper">
//     <div class="wpb_text_column wpb_content_element  pstext">
//     <div class="wpb_wrapper">
//     <headingsm>في البداية نعمل على تحقيق ثلاثة أهداف</headingsm>
//     <headingsm>وهي باستمرار منطلق خططنا المتواصلة ومحل اهتمام موظفينا</headingsm>
//     <div class="wpb_column vc_column_container vc_col-sm-6" style="text-align: right;">
//     <ul>
//     <li>توفير الرعاية المتميزة لمرضانا</li>
//     <li>أن يكون المستشفى بيئة عمل مناسبة لاستقطاب الكفاءات المتميزة</li>
//     <li>أن نوفر لأطبائنا كافة الإمكانات ووسائل العمل المتقدمة لأداء عملهم بشكل احترافي لخدمة المرضى</li>
//     </ul>
//     <div class="pstext wpb_column vc_column_container vc_col-sm-6">
//     <div class="wpb_wrapper">
//     <div class="vc_row wpb_row vc_inner vc_row-fluid">
//     <div class="wpb_column vc_column_container vc_col-sm-12">
//     <div class="vc_column-inner">
//     <div class="wpb_wrapper">
//     <div class="wpb_text_column wpb_content_element ">
//     <div class="wpb_wrapper">
//     <div style="font-size: 15px; line-height: 25px; text-align: justify;">
//     <p dir="rtl">إن الخبرة الممتازة للأطباء والموظفين والعاملين ، وأحدث التكنولوجيا الطبية تتيح لنا تقديم خدمات متطورة ومتقدمة في بيئة مناسبة للشفاء بإذن الله .</p>
//     <p dir="rtl">الرعاية الصحية في مستشفى الأطباء المتحدون أكثر من مجرد علاج للحالات المرضية فالصحة والعافية والشفاء &ndash; بإذن الله &ndash; كل ذلك يتطلب الفهم العميق للعلاقة القوية بين عقل المريض وجسده وروحه وهذا ما نؤمن به .</p>
//     <p dir="rtl">أرحب بكم في مستشفى الأطباء المتحدون كزائرين، أو مرضى، أو متقدمين لوظيفة معينة . ويحدوني الأمل في أن تكون تجربتكم معنا أمراً إيجابياً جداً . وأثناء جولتكم لاستكشاف موقعنا ، لا تترددوا في الاتصال بي أو بأيٍ من موظفينا للرد على أسئلتكم أو تعليقاتكم .</p>
//     <div class="vc_row wpb_row vc_row-fluid">
//     <div class="pstext wpb_column vc_column_container vc_col-sm-12">
//     <div class="wpb_wrapper">
//     <div class="wpb_text_column wpb_content_element  pstext">
//     <div class="wpb_wrapper">
//     <headingsm>مع أطيب التحيات ،،،</headingsm>
//     </div>
//     </div>
//     </div>
//     </div>
//     </div>
//     <div class="vc_row wpb_row vc_row-fluid">
//     <div class="wpb_column vc_column_container vc_col-sm-4">
//     <div class="wpb_wrapper">
//     <div class="vc_row wpb_row vc_inner vc_row-fluid pstext">
//     <div class="wpb_column vc_column_container vc_col-sm-12">
//     <div class="vc_column-inner">
//     <div class="wpb_wrapper">
//     <div class="wpb_text_column wpb_content_element ">
//     <div class="wpb_wrapper">
//     <div dir="rtl" style="text-align: center;"><span style="font-size: 14px; line-height: 20px; color: #0094ff;">علي سالم السبيعي</span><br /> <span style="font-size: 14px; line-height: 20px; color: #0094ff;">المدير العام</span><br /> <span style="font-size: 14px; line-height: 20px; padding-right: 20px;">هاتف : 00966126533333 </span><br /> <span style="font-size: 14px; line-height: 20px; padding-right: 20px;">تحويلة : 1405 </span></div>
//     <p dir="rtl">&nbsp;</p>
//     </div>    
// `
// };

const htmlContent = {
    EN: `<heading>Welcome to United Doctors Hospital app - UDH smart</heading>

        <p>We are pleased to use this communication vehicle to provide information to you about our organization, services and
            initiatives. We hope you are easily able to find all the information you want to know about United Doctors Hospital
            with a multitude of links to answer all your healthcare needs.</p>
        <p>United Doctors Hospital is an extraordinary organization, with an extraordinary staff, that provides extraordinary
            care. We all strive to achieve our mission & to be an excellent healthcare organization by “Putting the Patient
            First”.</p>
        <p>We combine the best technology, facilities, human resources, and excellent care with the healing powers of human
            touch, respect and dignity. We strive to provide patient centered care in a healing environment. This is not just
            what we believe, but is what we practice.</p>

        <headingsm>The three pillars of our management approach that we are committed to achieving it</headingsm>

        <lvl1>To provide excellent care to our patients</lvl1>

        <lvl2>To be an excellent organization to work for.</lvl2>

        <lvl3>To provide our physicians an excellent organization and environment to practice</lvl3>

        <p>The excellent experience of doctors, staff and staff, and the latest medical technology allows us to provide advanced
            and high quality services in a suitable environment for healing, God willing.</p>

        <p>Health care in United Doctors Hospital is more than just a treatment for health conditions. Health, wellness and
            healing – God willing – all require a deep understanding of the strong relationship between the patient’s mind, body
            and spirit, and this is what we believe.</p>

        <p>Welcome to the United Doctors Hospital as visitors, patients, or applicants. I hope that your experience with us will
            be very positive. During your tour to explore our services, do not hesitate to contact me or any of our staff to answer
            your questions or comments.</p>



        <strong>Best regards...</strong>

        <p>Mr. Ali Salem Al Subai
        <p>Director General</p>
        <p>Tel. : 00966126533333</p>
        <p>Ext. : 1405</p>`,


 AR: `<heading>مرحباً بكم في  تطبيق الخدمات الذكية لمستشفى الأطباء المتحدون UDH - Smart </heading>
    <div style="font-size: 15px; line-height: 25px; text-align: justify;">
    <p dir="rtl">يسرنا استخـدام هذه الوسيلة&nbsp;لنوفر لكم &nbsp;المعلومـات والخدمـات ونسـتقبل اقتراحـاتكم وملاحـظاتكم عن مستشفانا نتمنى لكم سهولة العثور على المعلومات التي تريدون معرفتها عن المستشفى وذلك بتصفح العديد من الروابط والخدمات المختلفة&nbsp;والاطلاع على ما يقدمه المستشفى من خدمات .</p>
    <p dir="rtl">مستشفى الأطباء المتحدون منشأة فريدة ، فيه موظفون رائعون ، يقدمون رعاية متميزة ونلتزم جميعاً بأن نسعى جاهدين لتحقيق رسالتنا المتمثلة بالرعاية الصحية المتميزة من خلال &ldquo;وضع مصلحة المريض أولاً&rdquo; .</p>
    <p dir="rtl">في مستشفى الأطباء المتحدون نحن نقوم بدمج أفضل التكنولوجيا والمقومات والموارد البشرية مع اللمسات الإنسانية ، والاحترام والكرامة للمريض من أجل الوصول لأفضل رعاية ممكنة للمرضى في بيئة مناسبة . وهذا الأمر ليس مجرد أمنيات ، ولكن هذا ما نمارسه فعلياً .</p>
    <div class="vc_row wpb_row vc_row-fluid">
    <div class="wpb_column vc_column_container vc_col-sm-12">
    <div class="wpb_wrapper">
    <div class="vc_row wpb_row vc_inner vc_row-fluid">
    <div class="pstext wpb_column vc_column_container vc_col-sm-12">
    <div class="vc_column-inner">
    <div class="wpb_wrapper">
    <div class="wpb_text_column wpb_content_element  pstext">
    <div class="wpb_wrapper">
    <headingsm>في البداية نعمل على تحقيق ثلاثة أهداف</headingsm>
    <headingsm>وهي باستمرار منطلق خططنا المتواصلة ومحل اهتمام موظفينا</headingsm>
    <div class="wpb_column vc_column_container vc_col-sm-6" style="text-align: right;">
    <ul>
    <li>توفير الرعاية المتميزة لمرضانا</li>
    <li>أن يكون المستشفى بيئة عمل مناسبة لاستقطاب الكفاءات المتميزة</li>
    <li>أن نوفر لأطبائنا كافة الإمكانات ووسائل العمل المتقدمة لأداء عملهم بشكل احترافي لخدمة المرضى</li>
    </ul>
    <div class="pstext wpb_column vc_column_container vc_col-sm-6">
    <div class="wpb_wrapper">
    <div class="vc_row wpb_row vc_inner vc_row-fluid">
    <div class="wpb_column vc_column_container vc_col-sm-12">
    <div class="vc_column-inner">
    <div class="wpb_wrapper">
    <div class="wpb_text_column wpb_content_element ">
    <div class="wpb_wrapper">
    <div style="font-size: 15px; line-height: 25px; text-align: justify;">
    <p dir="rtl">إن الخبرة الممتازة للأطباء والموظفين والعاملين ، وأحدث التكنولوجيا الطبية تتيح لنا تقديم خدمات متطورة ومتقدمة في بيئة مناسبة للشفاء بإذن الله .</p>
    <p dir="rtl">الرعاية الصحية في مستشفى الأطباء المتحدون أكثر من مجرد علاج للحالات المرضية فالصحة والعافية والشفاء &ndash; بإذن الله &ndash; كل ذلك يتطلب الفهم العميق للعلاقة القوية بين عقل المريض وجسده وروحه وهذا ما نؤمن به .</p>
    <p dir="rtl">أرحب بكم في مستشفى الأطباء المتحدون كزائرين، أو مرضى، أو متقدمين لوظيفة معينة . ويحدوني الأمل في أن تكون تجربتكم معنا أمراً إيجابياً جداً . وأثناء جولتكم لاستكشاف خدماتنا ، لا تترددوا في الاتصال بي أو بأيٍ من موظفينا للرد على أسئلتكم أو تعليقاتكم .</p>
    <div class="vc_row wpb_row vc_row-fluid">
    <div class="pstext wpb_column vc_column_container vc_col-sm-12">
    <div class="wpb_wrapper">
    <div class="wpb_text_column wpb_content_element  pstext">
    <div class="wpb_wrapper">
    <headingsm>مع أطيب التحيات ،،،</headingsm>
    </div>
    </div>
    </div>
    </div>
    </div>
    <div class="vc_row wpb_row vc_row-fluid">
    <div class="wpb_column vc_column_container vc_col-sm-4">
    <div class="wpb_wrapper">
    <div class="vc_row wpb_row vc_inner vc_row-fluid pstext">
    <div class="wpb_column vc_column_container vc_col-sm-12">
    <div class="vc_column-inner">
    <div class="wpb_wrapper">
    <div class="wpb_text_column wpb_content_element ">
    <div class="wpb_wrapper">
    <div dir="rtl" style="text-align: center;"><span style="font-size: 14px; line-height: 20px; color: #0094ff;">علي سالم السبيعي</span><br /> <span style="font-size: 14px; line-height: 20px; color: #0094ff;">المدير العام</span><br /> <span style="font-size: 14px; line-height: 20px; padding-right: 20px;">هاتف : 00966126533333 </span><br /> <span style="font-size: 14px; line-height: 20px; padding-right: 20px;">تحويلة : 1405 </span></div>
    <p dir="rtl">&nbsp;</p>
    </div>    
`
};
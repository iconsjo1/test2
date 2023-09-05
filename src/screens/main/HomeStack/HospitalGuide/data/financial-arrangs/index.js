import {I18nManager, Platform} from 'react-native';
import {colors, HP, images} from '../../../../../../services';
import {smallScreens} from '../../../../../../services/utilities/responsive';

export default [
  {
    html: I18nManager.isRTL
      ? `
<container>
<h4>الاستشارة - التامين:</h4>
<ul>
<li>
يراجع الموظف غطاءك التأميني وانت في المستشفى ، وقد يطلب
 .منك بطاقة التأمين
</li>
<li>
يطالب مستشفى الأطباء المتحدون عادة شركة التامين او الطرف
.الثالث مباشرة بدفع فواتير الخدمات التي يغطيها التأمين
</li>
<li>
إدا لم تكن من المؤمن عليهم او رفضت شركة التأمين التغطية  
 تقبل مستشفى الأطباء المتحدون الأموال النقدية أو البطاقات
 (MASTER  CARD - VISA) الائتمانية
</li>
</ul>
<div
      style="
      margin-top:  ${HP('1.5')};
      margin-bottom:  ${HP('1.5')};
      width: 100%;
      height: ${HP('25')}
      "
      >
      <img 
      style="
      width: 100%;
      height: 100%;
      object-fit: fill;
      "
      src="https://firebasestorage.googleapis.com/v0/b/udhsmart.appspot.com/o/visa.jpg?alt=media&token=6af31b79-48c1-4906-aed1-776dd06a6676" />
      </div>
<p>
في حال التخوف من تكاليف الإقامة في المستشفى ،  يمكنك كما 
يمكن لاحد افراد عائلتك التحدث مع الأخصائي ، وسيساعدك 
الأخصائي  الاجتماعي في الوصول الى دعم مالي بديل في 
حدود المتاح بالمستشفى 
</p>
</container>
`
      : `
      <container>
      <h4>الاستشارة - التامين:</h4>
      <ul>
      <li>
      يراجع الموظف غطاءك التأميني وانت في المستشفى ، وقد يطلب
       .منك بطاقة التأمين
      </li>
      <li>
      يطالب مستشفى الأطباء المتحدون عادة شركة التامين او الطرف
      .الثالث مباشرة بدفع فواتير الخدمات التي يغطيها التأمين
      </li>
      <li>
      إدا لم تكن من المؤمن عليهم او رفضت شركة التأمين التغطية  
       تقبل مستشفى الأطباء المتحدون الأموال النقدية أو البطاقات
       (MASTER  CARD - VISA) الائتمانية
      </li>
      </ul>
      <div
            style="
            margin-top:  ${HP('1.5')};
            margin-bottom:  ${HP('1.5')};
            width: 100%;
            height: ${HP('25')}
            "
            >
            <img 
            style="
            width: 100%;
            height: 100%;
            object-fit: fill;
            "
            src="https://firebasestorage.googleapis.com/v0/b/udhsmart.appspot.com/o/visa.jpg?alt=media&token=6af31b79-48c1-4906-aed1-776dd06a6676" />
            </div>
      <p>
      في حال التخوف من تكاليف الإقامة في المستشفى ،  يمكنك كما 
      يمكن لاحد افراد عائلتك التحدث مع الأخصائي ، وسيساعدك 
      الأخصائي  الاجتماعي في الوصول الى دعم مالي بديل في 
      حدود المتاح بالمستشفى 
      </p>
      </container>
      `,
  },
];

import {I18nManager, Platform} from 'react-native';
import {colors, HP, images} from '../../../../../../services';
import {smallScreens} from '../../../../../../services/utilities/responsive';

export default [
  {
    html: I18nManager.isRTL
      ? `
<container>
<ul>
<li>
سوف يكون في خدمتك فريق ممتاز من مقدمي الرعاية الصحية ووحدةرعاية وستكون لك غرفة وسرير خاص
</li>
<li>
وبمجرد دخول غرفتك ، ستقدم الممرضة المعنية بك بعض
المعلومات الأساسية ، وسيوضح لك طاقم العمل ساعات الزيارة 
.والسياسات الخاصة بالمستشفى والروتين المتبع والخدمات المقدمة 
</li>
</ul>
<div
style="
margin-top:  ${HP('1.5')};
margin-bottom:  ${HP('1.5')};
width: 100%;
height: ${HP('20')}
"
>
<img 
style="
width: 100%;
height: 100%;
object-fit: fill;
"
src="https://firebasestorage.googleapis.com/v0/b/udhsmart.appspot.com/o/room1.jpg?alt=media&token=fffc8302-4951-4fa0-b9be-231fa63c6067" />
</div>
<p>وسوف يعقد فريق الرعاية مقابلة شخصية معك او مع أسرتك أو معكم ويرتب إجراءات رعايتك وفقاً للمعلومات المستخلصة من المقابلة يرجى توفير المعلومات الدقيقة والكاملة للفريق حتى يمكن تلبيه احتياجك من الرعاية على اكمل وجه ، طاقم العمل مستعد دوماً للإجابة على اسئلتك أو مخاوفك </p>
</container>
`
      : `
      <container>
      <ul>
      <li>
      سوف يكون في خدمتك فريق ممتاز من مقدمي الرعاية الصحية ووحدةرعاية وستكون لك غرفة وسرير خاص
      </li>
      <li>
      وبمجرد دخول غرفتك ، ستقدم الممرضة المعنية بك بعض
      المعلومات الأساسية ، وسيوضح لك طاقم العمل ساعات الزيارة 
      .والسياسات الخاصة بالمستشفى والروتين المتبع والخدمات المقدمة 
      </li>
      </ul>
      <div
      style="
      margin-top:  ${HP('1.5')};
      margin-bottom:  ${HP('1.5')};
      width: 100%;
      height: ${HP('20')}
      "
      >
      <img 
      style="
      width: 100%;
      height: 100%;
      object-fit: fill;
      "
      src="https://firebasestorage.googleapis.com/v0/b/udhsmart.appspot.com/o/room1.jpg?alt=media&token=fffc8302-4951-4fa0-b9be-231fa63c6067" />
      </div>
      <p>وسوف يعقد فريق الرعاية مقابلة شخصية معك او مع أسرتك أو معكم ويرتب إجراءات رعايتك وفقاً للمعلومات المستخلصة من المقابلة يرجى توفير المعلومات الدقيقة والكاملة للفريق حتى يمكن تلبيه احتياجك من الرعاية على اكمل وجه ، طاقم العمل مستعد دوماً للإجابة على اسئلتك أو مخاوفك </p>
      </container>
      `,
  },
];

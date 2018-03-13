import React, { Component } from 'react';
import Avatar from '../../../../components/Avatar';

import './post.css';

const testAvatar = "../../testImages/avatar.png";

export default class Post extends Component {
    render() {
        return (
            <div className="post-wrapper u-margin-header">
                <div className="container">
                    <article className="article">
                        <div className="header u-clearfix u-padding-b-32 z-index-100">
                            <div className="u-push-left">
                                <Avatar avatarUrl={testAvatar} />
                            </div>
                            <div className="title font-size-24 font-weight-5 u-push-left u-margin-l-16">標題就是不能超過25個字標題就是不能超過25個字</div>
                        </div>
                        <div className="article__body">
                            <label className="label font-size-18">貓的故事</label>
                            <div className="description font-size-16 u-padding-b-24">
                                三隻是同胎姊妹,彼此感情很好,常會看到互相照顧的畫面讓人融化
                                因為從小接觸人類的關係,對人很親,很愛撒嬌,睡覺也都喜歡跟人一起睡
                                但貓咪是心思細膩的生物,轉換環境通常還是需要一些時間適應的喔~
                            </div>
                            <label className="label font-size-18">個性描述</label>
                            <div className="description font-size-16 u-padding-b-24">
                                姓名: 太妃,踏雪,捏捏
                                性別: 都是女孩子
                                外型: 體型偏小,體重約兩公斤,
                                太妃跟踏雪是三花貓,捏捏是虎斑貓
                                健康狀況:
                                兩隻皆良好,已驅蟲已除蚤,已打兩劑預防針
                                -太妃-
                                我覺得她是一隻很有趣的貓咪,
                                一開始是這三隻中相比之下怕生的貓,但熟悉了之後,黏人程度直逼極限!
                                用電腦時一定會出現在桌面,興趣是跟前跟後,對你的一舉一動都十分感興趣,
                                喜歡跟貓咪零距離的人就很適合跟他一起生活
                                -踏雪-
                                是一隻很乖巧懂事的貓咪,個性穩定,不太會搗蛋,
                                似乎是三姊妹中最被寵愛的貓,太妃跟捏捏都喜歡跟她一起睡覺幫她洗澡~
                                抱抱跟剪指甲很乖,不會掙扎,邊摸她的話還會呼嚕,
                                完全不怕生,遇到陌生人一樣會撒嬌,在新環境也適應最快,
                                不確定是她適應力強,還是個性太天然不懂害怕XD
                                -捏捏-
                                同胎中唯一的虎斑貓,她很有特色,
                                一旦跟她對上眼,就會收到大聲地摸摸請求,
                                她會從遠處飛奔到你身邊,
                                讓人有種”你剛剛看我了對吧 代表你有空跟我玩了對吧 來玩來玩”的感覺XD
                                她的毛蓬蓬的,摸起來特別柔軟,個子比較小一點,
                                因為毛量多容易被誤會成胖胖,不過她是三姊妹中最輕的喔~
                            </div>
                            <label className="label font-size-18">縣市</label>
                            <div className="description font-size-16 u-padding-b-24">
                                新北市
                            </div>
                            <label className="label font-size-18">所在 區 / 市 / 鎮 / 鄉 (行政區): </label>
                            <div className="description font-size-16 u-padding-b-24">
                                新莊區
                            </div>
                            <label className="label font-size-18">年齡</label>
                            <div className="description font-size-16 u-padding-b-24">
                                35 週 4 日 了
                            </div>
                            
                        </div>
                    </article>
                </div>
            </div>
        );
    }
}
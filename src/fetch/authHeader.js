export function authHeader() {
    const memberCuid = localStorage.getItem('memberCuid'); // 還沒有localStorage的時候是null
    const token = localStorage.getItem('memberToken');
    if (memberCuid && token) {
        return {
            headers: {Authorization: JSON.stringify({ //一定要stringify, 否則後端無法parse
                cuid: memberCuid, 
                token: token
            })}
        };
        
    } else {
        return {
            headers: {Authorization: JSON.stringify({ //一定要stringify, 否則後端無法parse
                cuid: null, 
                token: null
            })}
        }
    }
}
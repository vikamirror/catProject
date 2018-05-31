export function setItems(data) {
    localStorage.setItem('memberCuid', data.member.cuid);
    localStorage.setItem('memberName', data.member.name);
    localStorage.setItem('memberAvatar', data.member.avatar);
    localStorage.setItem('memberToken', data.memberToken);
}

export function removeMemberCached() {
    localStorage.removeItem('memberCuid');
    localStorage.removeItem('memberName');
    localStorage.removeItem('memberAvatar');
    localStorage.removeItem('memberToken');
}

export function getMemberCached() {
    const cuid = localStorage.getItem('memberCuid');
    const name = localStorage.getItem('memberName');
    const avatar = localStorage.getItem('memberAvatar');
    return {
        cuid: cuid,
        name: name,
        avatar: avatar
    };
}
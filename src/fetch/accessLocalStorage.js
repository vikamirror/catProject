export function setItems(data) {
    localStorage.setItem('memberCuid', data.member.cuid);
    localStorage.setItem('memberName', data.member.name);
    localStorage.setItem('memberAvatar', data.member.avatar);
    localStorage.setItem('memberToken', data.memberToken);
}
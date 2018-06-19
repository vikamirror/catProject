export function postWrapper (post, author) {
    if (!post || !author) {
        console.error("參數缺少post或author 於 post.wrapperpost");
    }
    return {
        cuid: post.cuid,
        title: post.title,
        cover: post.cover,
        charactor: post.charactor,
        city: post.city,
        district: post.district,
        age: post.age,
        gender: post.gender,
        isSpay: post.isSpay,
        requirements: post.requirements,
        remark: post.remark,
        contact: post.contact,
        contactInfo: post.contactInfo,
        author: {
            cuid: author.cuid,
            name: author.name,
            avatar: author.avatar
        },
        dateAdded: post.dateAdded,
        lastModify: post.lastModify
    };
}
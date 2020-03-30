let posts = [

    {
        id: "1",
        description: "Более 76 тыс. человек во всем мире уже излечились от заболевания, " +
            "спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.",
        createdAt: new Date('2020-03-17T23:00:00'),
        author: "Иванов Иван",
        photoLink: "https://www.pressball.by/images/stories/2020/03/20200310231542.jpg",
        hasnTags: [],
        likes: ["Ева","Ася"]
    },

    {
        id: "2",
        description: "text2",
        createdAt: new Date('2020-03-17T23:00:00'),
        author: "Иванов Иван",
        photoLink: "",
        hashTags: ["hashtag", "tag"],
        likes: []

    },
    {
        id: "3",
        description: "text3",
        createdAt: new Date('2020-03-17T23:00:00'),
        author: "Иванов Иван",
        photoLink: "",
        hasnTags: [],
        likes: []
    },
    {
        id: "4",
        description: "text4",
        createdAt: new Date('2020-03-17T23:00:00'),
        author: "Петров Петр",
        photoLink: "",
        hasnTags: [],
        likes: []
    },
    
    {
        id: "5",
        description: "text5",
        createdAt: new Date('2020-03-17T23:00:00'),
        author: "Иванов Иван",
        photoLink: "",
        hasnTags: [],
        likes: []
    },
    {
        id: "6",
        description: "text6",
        createdAt: new Date('2020-03-25T23:00:00'),
        author: "Иванов Иван",
        photoLink: "",
        hasnTags: [],
        likes: []
    },
    {
        id: "7",
        description: "text7",
        createdAt: new Date('2020-03-17T23:00:00'),
        author: "Котик",
        photoLink: "https://avatars.mds.yandex.net/get-zen_doc/233051/pub_5cc021e170f6f500b0dde324_5cc026c055863600b3c2d5ce/scale_1200",
        hasnTags: [],
        likes: []
    },
    {
        id: "8",
        description: "text8",
        createdAt: new Date('2020-03-17T23:00:00'),
        author: "Иванов Иван",
        photoLink: "",
        hasnTags: [],
        likes: []
    },
    {
        id: "9",
        description: "text9",
        createdAt: new Date('2020-03-17T23:00:00'),
        author: "Иванов Иван",
        photoLink: "",
        hasnTags: [],
        likes: []
    },
    {
        id: "10",
        description: "text10",
        createdAt: new Date('2020-03-17T23:00:00'),
        author: "Иванов Иван",
        photoLink: "",
        hasnTags: [],
        likes: ["Котик"]
    },
    {
        id: "11",
        description: "text11",
        createdAt: new Date('2020-03-17T23:00:00'),
        author: "Иванов Иван",
        photoLink: "",
        hasnTags: [],
        likes: ["Котик"]
    },
    {
        id: "12",
        description: "text10",
        createdAt: new Date('2020-03-17T23:00:00'),
        author: "Иванов Иван",
        photoLink: "",
        hasnTags: [],
        likes: ["Котик"]
    },
    {
        id: "13",
        description: "text10",
        createdAt: new Date('2020-03-17T23:00:00'),
        author: "Иванов Иван",
        photoLink: "",
        hasnTags: [],
        likes: ["Котик"]
    },
    {
        id: "14",
        description: "text10",
        createdAt: new Date('2020-03-17T23:00:00'),
        author: "Иванов Иван",
        photoLink: "",
        hasnTags: [],
        likes: ["Котик"]
    },
    {
        id: "15",
        description: "text10",
        createdAt: new Date('2020-03-17T23:00:00'),
        author: "Иванов Иван",
        photoLink: "",
        hasnTags: [],
        likes: ["Котик"]
    },
    {
        id: "16",
        description: "text10",
        createdAt: new Date('2020-03-17T23:00:00'),
        author: "Иванов Иван",
        photoLink: "",
        hasnTags: [],
        likes: ["Котик"]
    },
    {
        id: "17",
        description: "text10",
        createdAt: new Date('2020-03-17T23:00:00'),
        author: "Иванов Иван",
        photoLink: "",
        hasnTags: [],
        likes: ["Котик"]
    },
    {
        id: "18",
        description: "text10",
        createdAt: new Date('2020-03-25T23:00:00'),
        author: "Иванов Иван",
        photoLink: "",
        hasnTags: [],
        likes: []
    },
    {
        id: "19",
        description: "text10",
        createdAt: new Date('2020-03-26T23:00:00'),
        author: "Иванов Иван",
        photoLink: "",
        hasnTags: ["tag"],
        likes: ["Котик"]
    },
    {
        id: "20",
        description: "text20",
        createdAt: new Date('2020-03-27T23:00:00'),
        author: "Иванов Иван",
        photoLink: "",
        hasnTags: ["hashtag", "tag"],
        likes: []
    },

];

function sortByDate(posts) {
    return posts.sort((a, b) => a.createdAt.getTime() > b.createdAt.getTime() ? -1 : 1);
}

function getPosts(skip, top, filterConfig) {
    var result = posts;
    var from = skip || 0;
    var number = top || 10;
   
    if (filterConfig) {
        if (filterConfig.author) {
            result = result.filter(function (element) {
                return element.author == filterConfig.author;
            })
        }
        if (filterConfig.dateFrom) {
            result = result.filter(function (element) {
                return element.createdAt.getTime() >= filterConfig.dateFrom.getTime();
            })
        }
        if (filterConfig.dateTo) {
            result = result.filter(function (element) {
                return element.createdAt.getTime() <= filterConfig.dateTo.getTime();
            })
        }

        if (filterConfig.hashTags && filterConfig.hashTags.length != 0) {
            result = result.filter(function (element) {
                if (typeof element.hashtags !== "undefined") {
                    return filterConfig.hashTags.every(function (tag) {
                        return element.hashTags.indexOf(tag) >= 0;
                    })
                }
            })
        }
    }
    result = sortByDate(result);
    return result.slice(from, from + number);
}

function containsId(id) {
    if (posts.filter(function (element) {
            return element.id == id;
    }).length != 0) {
        return true;
    }
    else {
        return false;
    }
}

function getPost(id) {
    if (!containsId(id)) return false;
    else {
        return posts.filter(function (element) {
            return element.id == id;
        })[0];
    }
}

function validatePost(post) {
    if (!post.id || !post.author || post.author.length == 0 || !post.description || post.description.length == 0 || post.description.length > 200 ||
        !post.createdAt || post.createdAt.length == 0) return false;
    if (!Date.parse(post.createdAt)) return false;
    else return true;
}

function addPost(post) {
    if (!validatePost(post)) {
        return false;
    }
    if (containsId(post.id)) {
        return false;
    }
    else {
        posts.push(post);
        return true;
    }
}

function editPost(editId, post) {
    if (!containsId(editId)) return false;
    var index = posts.indexOf(getPost(editId));
    if (!validatePost(posts[index])) return false;
    if (post.description && post.description.length !== 0) {
        posts[index].description = post.description;
    }
    if (post.hashTags) {
        posts[index].hashTags = post.hashTags;
    }
    if (post.photoLink) {
        posts[index].photoLink = post.photoLink;
    }
    return true;
}

function removePost(removeId) {
    var index = posts.indexOf(getPost(removeId));
    if (index != -1) {
        posts.splice(index, 1);
        return true;
    }
    else {
        return false;
    }
}




console.log("id = 3 ");
console.log (getPost("3"));
console.log("id does not exist " + getPost("30"));

var valid = {
    id: 21,
    description: "text \n valid post",
    createdAt: new Date(),
    author: "Иван",
    hasnTags: [],
    likes: []
};

var invalid = {
    id: 21,
    description: "text",
    createdAt: "22 33 55",
    author: "Иван",
    hasnTags: [],
    likes: []
};

var invalid1 = {
    id: 55,
    author: "Nobody",
    description: "",
    createdAt: new Date(),
};

var invalid2 = {
    id: 44,
    author: "Nobody",
    description: "text",
};

console.log(validatePost(valid));
console.log(validatePost(invalid1));
console.log(validatePost(invalid2));

var post2 = {
    id: 2,
    description: "id = 2 -- invalid",
    createdAt: new Date(),
    author: "Иван",
    hasnTags: [],
    likes: []
};

console.log(addPost(valid));
console.log(addPost(post2));
console.log(addPost(invalid1));
console.log(getPost(21));

console.log("before edit ");
console.log(getPost(1));
editPost("1", { photoLink: "https://delo.ua/files/news/images/3646/4/picture2_koronavirus-poluc_364604_p0.jpg" });
console.log("after edit ");
console.log(getPost(1));
editPost("101", { photoLink: "https://delo.ua/files/news/images/3646/4/picture2_koronavirus-poluc_364604_p0.jpg" });

console.log("getposts(0, 10, author: Иванов Иван): ");
getPosts(0, 10, { author: "Иванов Иван" }).forEach(function (element) {
    console.log(element);
});
removePost("1");
console.log("getposts(0, 12, author: Иванов Иван): after removePost(1)");
getPosts(0, 10, { author: "Иванов Иван" }).forEach(function (element) {
    console.log(element);
});
console.log("getposts(0, 10, author: Иванов Иван, hashTag: hashtag): ");
getPosts(0, 10, { author: "Иванов Иван", hashTag: "hashtag" }).forEach(function (element) {
    console.log(element);
});
console.log("getposts(10, 10, author: Иванов Иван, hashTag: hashtag и/или tag): ");
getPosts(10, 10, { author: "Иванов Иван", hashTag: ["hashtag", "tag"] }).forEach(function (element) {
    console.log(element);
});
console.log("getposts(0, 10, dateFrom = ('2020-03-25T23:00:00'), dateTo: ('2020-03-26T23:00:00') ): ");
getPosts(0, 10, { dateFrom: new Date('2020-03-25T23:00:00'), dateTo: new Date('2020-03-26T23:00:00') }).forEach(function (element) {
    console.log(element);
});

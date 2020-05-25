let user = {"globalName" : ""};
let i = 30;
let posts;
let skip = 10;
let filter;
let postToEditId = 1;
class PostList {
    constructor(posts) {
        this._posts = posts || [];
    }

    static _sortByDate(posts) {
        return posts.sort((a, b) => a.createdAt.getTime() > b.createdAt.getTime() ? -1 : 1);
    }

    getPage(skip, top, filterConfig) {
        var result = this._posts;
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
                    if (typeof element.hashTags !== "undefined") {
                        return filterConfig.hashTags.every(function (tag) {
                            return element.hashTags.indexOf(tag) >= 0;
                        })
                    }
                })
            }
        }
        result = PostList._sortByDate(result);
        return result.slice(from, from + number);
    }

    static _containsId(posts, id) {
        if (posts.filter(function (element) {
                return element.id == id;
        }).length != 0) {
            return true;
        }
        else {
            return false;
        }
    }

    get(id) {
        if (!PostList._containsId(this._posts, id)) {
            return false;
        }
        else {
            return this._posts.filter(function (element) {
                return element.id == id;
            })[0];
        }
    }

    static validate(post) {
        if (!post.id || !post.author || post.author.length == 0 || !post.description || post.description.length == 0 || post.description.length > 200 ||
            !post.createdAt || post.createdAt.length == 0) return false;
        if (!Date.parse(post.createdAt)) {
            return false;
        }
        else {
            return true;
        }
    }

    add(post) {
        if (!PostList.validate(post)) {
            return false;
        }
        if (PostList._containsId(this._posts, post.id)) {
            return false;
        }
        else {
            this._posts.push(post);
            return true;
        }
    }

    static _find(posts, id) {
        if (!PostList._containsId(posts, id)) {
            return false;
        }
        else {
            return posts.filter(function (element) {
                return element.id == id;
            })[0];
        }
    }

    edit(editId, post) {
        if (!PostList._containsId(this._posts, editId)) return false;
        var index = this._posts.indexOf(PostList._find(this._posts, editId));
        if (!PostList.validate(this._posts[index])) return false;
        if (post.description && post.description.length !== 0) {
            this._posts[index].description = post.description;
        }
        if (post.hashTags) {
            this._posts[index].hashTags = post.hashTags;
        }
        if (post.photoLink) {
            this._posts[index].photoLink = post.photoLink;
        }
        if (!PostList.validate(this._posts[index])) return false;
        return true;
    }

    remove(removeId) {
        var index = this._posts.indexOf(PostList._find(this._posts, removeId));
        if (index != -1) {
            this._posts.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
        return true;
    }

    addAll(postsAdd) {
        var invalid = [];
        var valid = [];
        postsAdd.forEach(function (post) {
            if (!PostList.validate(post)) {
                invalid.push(post);
            }
            else { 
                
                valid.push(post);
                return true;
            }
           
        });
        valid.forEach((post) => this._posts.push(post));
        return invalid;
    }

    clear() {
        this._posts = [];
    }


    save() {
        localStorage.setItem("posts", JSON.stringify(this._posts));
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("lastId", JSON.stringify(i));
    }

    restore(){
        let user1 = JSON.parse(localStorage.getItem("user"));
        posts = JSON.parse(localStorage.getItem("posts"));
        let j = JSON.parse(localStorage.getItem("lastId"));

        if (j != undefined && j !== "" && j != null) {
            i = j;
        }
        if (user1 != undefined && user1.globalName !== "" && user1 != null) {
            user = JSON.parse(localStorage.getItem("user"));
            view.setName();
            work.authorized();
        }
        if (posts == undefined || posts === "[]" || posts === null) {
            posts = posts1;
        }
        else {
            posts.forEach(el => el.createdAt = new Date(el.createdAt));
        }
    }
}


class View {
    setName(){
        let container1 = document.getElementById('username');
        let template1 = document.getElementById('userTemplate');
        let newNote = document.importNode(template1.content, true);
        let placeholders = newNote.querySelectorAll('[data-target]');

        [].forEach.call(placeholders || [], (phElement) => {
            let key = phElement.getAttribute('data-target');
                phElement.textContent = String(user[key]);
        });
        container1.appendChild(newNote);
    }

    template = document.getElementById('template');
    container = document.getElementById('notes');

    fillItemData(newNote, data) {
        let placeholders = newNote.querySelectorAll('[data-target]');

        [].forEach.call(placeholders || [], (phElement) => {
            let key = phElement.getAttribute('data-target');
            if (key == 'author' && String(data[key]) == user.globalName) {
                phElement.textContent = String(data[key]);
                newNote.firstElementChild.querySelector('[class="edit"]').style.visibility="visible";
            }
            else
            if(key == 'hashTags'){
                phElement.textContent=String(data.hashTags.map(item => ' #' + item).join(''));
            }
            else
            if (key == 'createdAt') {
                phElement.textContent = String(data[key].toLocaleString());
            }
            else
            if (key == 'photoLink' && String(data[key].toLocaleString()) != "") {
                phElement.src = String(data[key].toLocaleString());
            }
            else
                phElement.textContent = String(data[key]);

        });
        newNote.firstElementChild.setAttribute('id', data.id);

    }

    addItem(post) {
        let newNote = document.importNode(this.template.content, true);
        this.fillItemData(newNote, post);
        this.container.insertBefore(newNote, this.container.firstElementChild);
    }

    addAll(posts) {
        posts.forEach((post) => this.addItem(post));
    }

    load(post) {
        let newNote = document.importNode(this.template.content, true);
        this.fillItemData(newNote, post);
        this.container.insertBefore(newNote, this.container.lastElementChild);
    }

    loadAll(posts) {
        posts.forEach((post) => this.load(post));
    }

    edit(id, post) {
        let newNote = document.importNode(this.template.content, true);
        this.fillItemData(newNote, post);
        document.getElementById(id).replaceWith(newNote);
    }

    remove(id) {
        document.getElementById(id).remove();
    }

}


function addPost(post) {
    if (tweets.add(post))
        view.addItem(post);
}

function addNewPost(description, tags, photoLink) {
    let newPost = {
        id: i++,
        description: description,
        createdAt: new Date(),
        author: user.globalName,
        photoLink: photoLink,
        hashTags: tags.split(" ").filter(element => element !== ""),
        likes: []
    }

    if (tweets.add(newPost))
        view.addItem(newPost);
    skip++;
}

function addAllPosts(posts) {
    if (tweets.addAll(posts))
        view.addAll(posts);
}
function removePost(id) {
    if (tweets.remove(id))
        view.remove(id);
}
function editPost(id, post) {
    if (tweets.edit(id, post))
        view.edit(id, tweets.get(id));
}

class Work {

    load() {
        view.loadAll(tweets.getPage(skip, "", filter));
        if (Object.keys(tweets.getPage(skip, "", filter)).length < 10) document.getElementById("load").style.visibility = "hidden";
        skip += 10;
    }
    authorized() {
        document.getElementsByClassName("sign-block")[0].style.visibility = "hidden";
        document.getElementsByClassName("logIn")[0].style.visibility = "hidden";
        document.getElementsByClassName("logOut")[0].style.visibility = "visible";
        document.getElementsByClassName("addPost")[0].style.visibility = "visible";
        document.getElementsByClassName("addPost")[0].removeEventListener('click', work.addPost);
        document.getElementsByClassName("addPost")[0].removeEventListener('click', work.addPostForm);
        document.getElementsByClassName("addPost")[0].addEventListener('click', work.addPostForm);
    }
    logIn() {
        if (document.sign.log.value !== "" && document.sign.password.value !== "") {
            user.globalName = document.sign.log.value;
            view.setName();
            work.authorized();
            location.reload();
            //document.posts.innerHTML = "";
            skip=10;
            view.loadAll(tweets.getPage());
            document.getElementById("load").style.visibility = "visible";
        }
        tweets.save();
    }
    logOut() {
        document.sign.password.value = "";
        document.getElementsByClassName("name")[0].remove();
        document.getElementsByClassName("sign-block")[0].style.visibility="visible";
        document.getElementsByClassName("logIn")[0].style.visibility="visible";
        document.getElementsByClassName("logOut")[0].style.visibility="hidden";
        document.getElementsByClassName("addEditPost")[0].style.visibility = "hidden";
        document.getElementsByClassName("addPost")[0].style.visibility = "hidden";
        user.globalName = "";
        tweets.save();
        document.getElementsByClassName("addPost")[0].addEventListener('click', work.addPostForm);
        document.getElementsByClassName("addPost")[0].removeEventListener('click', work.addPost);
        location.reload();
        //document.posts.innerHTML = "";
        skip=10;
        view.loadAll(tweets.getPage());
    }

    addPostForm() {
        if (user.globalName !== "") {
            document.getElementsByClassName("addEditPost")[0].style.visibility = "visible";
            document.getElementsByClassName("addPost")[0].removeEventListener('click', work.addPostForm);
            document.getElementsByClassName("addPost")[0].addEventListener('click', work.addPost);
        }
    }

    addPost() {
        filter = "";
        if (document.addEditPost.description.value !== "") {
            addNewPost(document.addEditPost.description.value, document.addEditPost.addHashtags.value, document.addEditPost.photoLink.value);
            document.getElementsByClassName("addPost")[0].addEventListener('click', work.addPostForm);
            document.getElementsByClassName("addPost")[0].removeEventListener('click', work.addPost);
            document.getElementsByClassName("addEditPost")[0].style.visibility = "hidden";
            document.addEditPost.description.value = "";
            document.addEditPost.addHashtags.value = "";
            document.addEditPost.photoLink.value = "";
            tweets.save();
        }
    }

    filter() {
        document.posts.innerHTML = "";
        filter = {
            author: document.filters.author.value,
            dateFrom: new Date(document.filters.dateFrom.value), //сделать штуку с галочкой, чтобы
            dateTo: new Date(document.filters.dateTo.value),
            hashTags: document.filters.tags.value.split(" ").filter(element => element !== "")
        };
        skip = 10;
        view.loadAll(tweets.getPage(skip-10, 10, filter));
        if (Object.keys(tweets.getPage(skip-10, "", filter)).length >= 10)
            document.getElementById("load").style.visibility = "visible";
        else {
            document.getElementById("load").style.visibility = "hidden";
        }
        //последний пост почему-то уезжает вниз при фильтрации
    }

    editButtons(event) {
        if (event.target.tagName == 'BUTTON' && event.target.className === "deleteButton") {
            let nodeToDelete = event.target.parentElement.parentElement.id;
            removePost(nodeToDelete);
            tweets.save();
        }
        if (event.target.tagName == 'BUTTON' && event.target.className === "editButton") {
            let id = event.target.parentElement.parentElement.id;
            let postToEdit = tweets.get(id);
            document.getElementsByClassName("addEditPost")[0].style.visibility = "visible";
            document.getElementsByClassName("addPost")[0].removeEventListener('click', work.addPostForm);
            document.addEditPost.description.value = postToEdit.description;
            document.addEditPost.addHashtags.value = postToEdit.hashTags.map(item => ' ' + item).join('');
            document.addEditPost.photoLink.value = postToEdit.photoLink;
            document.getElementsByClassName("addPost")[0].addEventListener('click', work.addEdited);
            postToEditId = id;
            tweets.save();
        }
    }

    addEdited() {
        let newPost = {
            description: document.addEditPost.description.value,
            photoLink: document.addEditPost.photoLink.value,
            hashTags: document.addEditPost.addHashtags.value.split(" ").filter(element => element !== ""),
        };
        editPost(postToEditId, newPost);
        document.getElementsByClassName("addPost")[0].removeEventListener('click', work.addEdited);
        document.getElementsByClassName("addPost")[0].addEventListener('click', work.addPostForm);
        editPost();
        document.getElementsByClassName("addEditPost")[0].style.visibility = "hidden";
        document.addEditPost.description.value = "";
        document.addEditPost.addHashtags.value = "";
        document.addEditPost.photoLink.value = "";
    }
}

window.onload = () => {
    tweets = new PostList();
    view = new View();
    work = new Work();
    tweets.restore();
    tweets.addAll(posts);
    view.loadAll(tweets.getPage());
    document.getElementById("load").addEventListener('click', work.load);
    document.getElementsByClassName("logIn")[0].addEventListener('click', work.logIn);
    document.getElementsByClassName("logOut")[0].addEventListener('click', work.logOut);
    document.getElementsByClassName("addPost")[0].addEventListener('click', work.addPostForm);
    document.getElementsByClassName("find")[0].addEventListener('click', work.filter);
    document.getElementsByClassName("postsForm")[0].addEventListener('click', work.editButtons);
}





let posts1 = [
    {
        id: "1",
        description: "Более 76 тыс. человек во всем мире уже излечились от заболевания, " +
            "спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.",
        createdAt: new Date('2020-03-15T23:00:00'),
        author: "Иванов Иван",
        photoLink: "https://www.pressball.by/images/stories/2020/03/20200310231542.jpg",
        hashTags: [],
        likes: ["Ева","Ася"]
    },
    {
        id: "2",
        description: "text2",
        createdAt: new Date('2020-03-16T23:00:00'),
        author: "Анастасия",
        photoLink: "",
        hashTags: ["hashtag", "tag"],
        likes: []

    },
    {
        id: "3",
        description: "text3",
        createdAt: new Date('2020-03-17T23:00:00'),
        author: "Анастасия",
        photoLink: "",
        hashTags: [],
        likes: []
    },
    {
        id: "4",
        description: "text4",
        createdAt: new Date('2020-03-17T23:00:00'),
        author: "Петров Петр",
        photoLink: "",
        hashTags: [],
        likes: []
    },

    {
        id: "5",
        description: "text5",
        createdAt: new Date('2020-03-17T23:00:00'),
        author: "Иванов Иван",
        photoLink: "",
        hashTags: [],
        likes: []
    },
    {
        id: "6",
        description: "text6",
        createdAt: new Date('2020-03-17T23:00:00'),
        author: "Анастасия",
        photoLink: "",
        hashTags: [],
        likes: []
    },
    {
        id: "7",
        description: "text7",
        createdAt: new Date('2020-03-17T23:00:00'),
        author: "Анастасия",
        photoLink: "",
        hashTags: ["hashtag", "tag"],
        likes: []

    },
    {
        id: "8",
        description: "text8",
        createdAt: new Date('2020-03-17T23:00:00'),
        author: "Анастасия",
        photoLink: "",
        hashTags: ["hashtag", "tag"],
        likes: []

    },
    {
        id: "9",
        description: "text9",
        createdAt: new Date('2020-03-17T23:00:00'),
        author: "Анастасия",
        photoLink: "",
        hashTags: ["hashtag", "tag"],
        likes: []

    },
    {
        id: "10",
        description: "одна ошибка и ты ошибся",
        createdAt: new Date('2020-03-17T23:00:00'),
        author: "Анастасия",
        photoLink: "",
        hashTags: ["ошибка", "tag"],
        likes: []

    },
    {
        id: "11",
        description: "я не плачю это дощ",
        createdAt: new Date('2020-05-22T23:00:00'),
        author: "Анастасия",
        photoLink: "",
        hashTags: ["hashtag", "tag"],
        likes: []

    },
    {
        id: "20",
        description: "text20",
        createdAt: new Date('2020-03-27T23:00:00'),
        author: "Иванов Иван",
        photoLink: "",
        hashTags: ["hashtag", "tag"],
        likes: []
    },
];
var valid = {
    id: "21",
    description: "text \n valid post",
    createdAt: new Date(),
    author: "Иван",
    hashTags: [],
    likes: []
};






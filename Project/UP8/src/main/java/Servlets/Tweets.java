package Servlets;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

class Tweet {
        String id;
        String description;
        String createdAt;
        String author;
        String photoLink;
        List<String> hashTags;
        List<String> likes;

        Tweet() {
            hashTags = new ArrayList<>();
            likes = new ArrayList<>();
        }

        Tweet(String str) {
            hashTags = new ArrayList<>();
            likes = new ArrayList<>();
            Scanner sc = new Scanner(str);
            sc.useDelimiter(";");
            this.id = sc.next();
            this.description = sc.next();
            this.createdAt = sc.next();
            this.author = sc.next();
            this.photoLink = sc.next();
            Scanner sc1 = new Scanner(sc.next());
            while (sc1.hasNext()) {
                hashTags.add(sc1.next());
            }
            sc1 = new Scanner(sc.next());
            while (sc1.hasNext()) {
                likes.add(sc1.next());
            }
        }

        @Override
        public String toString() {
            JSONObject post = new JSONObject(this);
            post.put("id", this.id);
            post.put("description", this.description);
            post.put("createdAt", this.createdAt);
            post.put("author", this.author);
            post.put("photoLink", this.photoLink);
            post.put("hashTags", this.hashTags);
            post.put("likes", this.likes);
            return post.toString();
        }
}

class AllTweets {
    private static List<Tweet> tweets;

    public AllTweets() {
        tweets = new ArrayList<>();
        init();
    }

    public static void add(String str) {
        Tweet tweet = new Tweet(str);
        tweets.add(tweet);
    }

    public static void init() {
        add("1;text1;2020-03-14T23:00:00;Author;;hashtag tag;2");
        add("2;text2;2020-03-17T23:00:00;Author;;;hashtag;1");
        add("3;text3;2020-03-17T23:00:00;Author;;hashtag;1");
        add("4;text4;2020-03-17T23:00:00;Author;;hashtag;1");
        add("5;text5;2020-03-17T23:00:00;Author;;hashtag;1");
    }

    public String get(String id) {
        String str = new String("{\"success\" : false}");
        for (Tweet tw : tweets) {
            if (tw.id.equals(id)) {
                str = tw.toString();
            }
        }
        return str;
    }

    public boolean remove(String id) {
        for (Tweet tw : tweets) {
            if (tw.id.equals(id)) {
                tweets.remove(tw);
                return true;
            }
        }
        return false;
    }

    @Override
    public String toString() {
        StringBuffer sb = new StringBuffer();
        for (Tweet tw : tweets) {
            sb.append(tw.toString()).append("\n");
        }
        return sb.toString();
    }
}

public class Tweets {
    private static AllTweets tweets;
    private Tweets() {}

    public static AllTweets getInstance() {
        if(tweets == null) {
            tweets = new AllTweets();
        }
        return tweets;
    }

}


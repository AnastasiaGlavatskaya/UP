package Servlets;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/tweets/*")
public class  ServletTweets extends HttpServlet {

    private AllTweets tweets;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        tweets = Tweets.getInstance();
        response.setContentType("application/json");
        String id = (String) request.getParameter("id");
        response.getWriter().println(tweets.get(id));
    }

    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
        tweets = Tweets.getInstance();
        String id = (String) request.getParameter("id");
        response.setContentType("application/json");

        if (tweets.remove(id)) {
            response.getWriter().println("{\"success\" : true}");
        }
        else {
            response.getWriter().println("{\"success\" : false}");
        }
    }
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        tweets = Tweets.getInstance();
        response.setContentType("application/json");
        if (request.getRequestURI().equals("/tweets/search")) {
            response.getWriter().println(tweets.toString());
        }
        else response.getWriter().println("{\"success\" : false}");

    }
}

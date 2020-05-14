package Servlets;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/get")
public class ServletName extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String name = (String) request.getParameter("name");
        if (name.length()<=100) {
            response.getWriter().println("<html><p> Name is " + name + "</p></html>");
        }
        //else {
        //            response.getWriter().println("<html><p> length(name) > 100 " + name + "</p></html>");
        //        }
    }
}

package model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


@Data
@Table(name = "users")
@Entity
public class User {
	
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String username;
	private String password;

	public HttpServletRequest getUsername() {
		return username;
	}

	public void setUsername(HttpServletRequest username) {
		this.username = username;
	}
}

package raf.aleksabuncic.dto;

public class TokenResponseDto {
    private String Token;

    public TokenResponseDto(String token) {
        Token = token;
    }

    public String getToken() {
        return Token;
    }

    public void setToken(String token) {
        Token = token;
    }
}

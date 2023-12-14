package raf.aleksabuncic.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import raf.aleksabuncic.dto.CreateUserDto;
import raf.aleksabuncic.dto.TokenRequestDto;
import raf.aleksabuncic.dto.TokenResponseDto;
import raf.aleksabuncic.dto.UserDto;
import raf.aleksabuncic.security.CheckSecurity;
import raf.aleksabuncic.service.UserService;

import java.util.List;

@RestController
@RequestMapping
public class Controller {
    private final UserService userService;

    public Controller(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user/list")
    @CheckSecurity(roles = {"ROLE_READ"})
    public ResponseEntity<List<UserDto>> listUsers() {

        return null;
    }

    @PostMapping("/user/add")
    @CheckSecurity(roles = {"ROLE_ADD"})
    public ResponseEntity<UserDto> addUser(@RequestHeader("Authorization") String authorization, @RequestBody CreateUserDto createUserDto) {
        return new ResponseEntity<>(userService.addUser(createUserDto), HttpStatus.OK);
    }

    @PostMapping("/user/register")
    public ResponseEntity<UserDto> registerUser(@RequestBody CreateUserDto createUserDto) {
        return new ResponseEntity<>(userService.register(createUserDto), HttpStatus.OK);
    }

    @PostMapping("/user/login")
    public ResponseEntity<TokenResponseDto> loginUser(@RequestBody TokenRequestDto tokenRequestDto) {
        return new ResponseEntity<>(userService.login(tokenRequestDto), HttpStatus.OK);
    }

    @PostMapping("/user/update")
    @CheckSecurity(roles = {"ROLE_UPDATE"})
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDto) {
        return new ResponseEntity<>(userService.updateUser(userDto), HttpStatus.OK);
    }

    @DeleteMapping("/user/delete/{id}")
    @CheckSecurity(roles = {"ROLE_DELETE"})
    public ResponseEntity<UserDto> banUser(@RequestHeader("Authorization") String authorization, @PathVariable(value = "id") int id) {
        return new ResponseEntity<>(userService.deleteUser(id), HttpStatus.OK);
    }
}

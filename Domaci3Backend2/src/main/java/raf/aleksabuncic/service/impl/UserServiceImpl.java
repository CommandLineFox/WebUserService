package raf.aleksabuncic.service.impl;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;
import raf.aleksabuncic.domain.User;
import raf.aleksabuncic.dto.*;
import raf.aleksabuncic.exception.NotFoundException;
import raf.aleksabuncic.helper.MessageHelper;
import raf.aleksabuncic.mapper.UserMapper;
import raf.aleksabuncic.repository.UserRepository;
import raf.aleksabuncic.security.service.TokenService;
import raf.aleksabuncic.service.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final TokenService tokenService;
    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final MessageHelper messageHelper;
    private final JmsTemplate jmsTemplate;
    private final String userDestination;

    public UserServiceImpl(UserMapper userMapper, UserRepository userRepository, TokenService tokenService, MessageHelper messageHelper, JmsTemplate jmsTemplate, @Value("${destination.sendNotification}") String userDestination) {
        this.userMapper = userMapper;
        this.userRepository = userRepository;
        this.tokenService = tokenService;
        this.messageHelper = messageHelper;
        this.jmsTemplate = jmsTemplate;
        this.userDestination = userDestination;
    }

    @Override
    public UserDto register(CreateUserDto createUserDto) {
        Optional<User> users = userRepository.findUserByMailAndPassword(createUserDto.getMail(), createUserDto.getPassword());

        if (users.isEmpty()) {
            User user = userMapper.createUserDtoToUser(createUserDto);
            userRepository.save(user);
            UserDto userDto = userMapper.userToUserDto(user);
            /*SendNotificationDto sendNotificationDto = new SendNotificationDto();
            sendNotificationDto.setFirstName(user.getFirstName());
            sendNotificationDto.setLastName(user.getLastName());
            sendNotificationDto.setEmail(user.getMail());
            sendNotificationDto.setNotificationType("aktivacioni");
            jmsTemplate.convertAndSend(userDestination, messageHelper.createTextMessage(sendNotificationDto)); //salje za odobrenje accounta*/
            return userDto;
        }
        return null;
    }

    @Override
    public List<UserDto> findUsers() {
        List<User> users = userRepository.findAll();
        List<UserDto> userDtos = new ArrayList<>();
        for (User user : users) {
            userDtos.add(userMapper.userToUserDto(user));
        }
        return userDtos;
    }

    public UserDto findUser(int id) {
        User user = userRepository.findByUserId(id);
        return userMapper.userToUserDto(user);
    }

    @Override
    public UserDto addUser(CreateUserDto createUserDto) {
        User user = userMapper.createUserDtoToUser(createUserDto);
        userRepository.save(user);
        return userMapper.userToUserDto(user);
    }

    @Override
    public UserDto updateUser(UserDto userDto) {
        User user = userRepository.findByUserId(userDto.getUserId());

        if (userDto.getFirstName() != null) {
            user.setFirstName(userDto.getFirstName());
        }
        if (userDto.getLastName() != null) {
            user.setLastName(userDto.getLastName());
        }
        if (userDto.getPassword() != null) {
            user.setPassword(userDto.getPassword());
        }
        if (userDto.getMail() != null) {
            user.setMail(userDto.getMail());
        }
        if (userDto.getReadUserPermission() != null) {
            user.setReadUserPermission(userDto.getReadUserPermission());
        }
        if (userDto.getCreateUserPermission() != null) {
            user.setCreateUserPermission(userDto.getCreateUserPermission());
        }
        if (userDto.getUpdateUserPermission() != null) {
            user.setUpdateUserPermission(userDto.getUpdateUserPermission());
        }
        if (userDto.getDeleteUserPermission() != null) {
            user.setDeleteUserPermission(user.getDeleteUserPermission());
        }

        userRepository.save(user);
        return userMapper.userToUserDto(user);
    }

    @Override
    public UserDto deleteUser(int id) {
        User user = userRepository.findByUserId(id);
        userRepository.delete(user);
        return userMapper.userToUserDto(user);
    }

    @Override
    public TokenResponseDto login(TokenRequestDto tokenRequestDto) {
        User user = userRepository.findUserByMailAndPassword(tokenRequestDto.getMail(), tokenRequestDto.getPassword()).orElseThrow(() -> new NotFoundException(String.format("User with username: %s and password: %s not found.", tokenRequestDto.getMail(), tokenRequestDto.getPassword())));

        Claims claims = Jwts.claims();
        claims.put("id", user.getUserId());
        claims.put("ROLE_READ", user.getReadUserPermission() == 1);
        claims.put("ROLE_ADD", user.getCreateUserPermission() == 1);
        claims.put("ROLE_UPDATE", user.getUpdateUserPermission() == 1);
        claims.put("ROLE_DELETE", user.getDeleteUserPermission() == 1);

        return new TokenResponseDto(tokenService.generate(claims));
    }
}

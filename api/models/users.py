"""
Pydantic Models for Users.
"""
from pydantic import BaseModel


class UserRequest(BaseModel):
    """
    Represents a the parameters needed to create a new user
    """

    username: str
    password: str
    first_name: str
    last_name: str
    email: str
    phone_number: str
    age: int


class UserLogin(BaseModel):
    """
    Represents a the parameters needed to login a user
    """

    username: str
    password: str


class UserResponse(BaseModel):
    """
    Represents a user, with the password not included
    """

    id: int
    username: str


class UserDetail(BaseModel):
    """
    Represents a the parameters needed to create a new user
    """

    id: int
    username: str
    password: str
    first_name: str
    last_name: str
    email: str
    phone_number: str
    age: int


class UserWithPw(BaseModel):
    """
    Represents a user with password included
    """

    id: int
    username: str
    password: str
    first_name: str
    last_name: str
    email: str
    phone_number: str
    age: int

"""
Pydantic Models for Users.
"""
from pydantic import BaseModel


class UserIn(BaseModel):
    username: str
    first_name: str
    last_name: str
    phone: str
    age: int
    password: str
    confirmed_password: str


class UserOut(UserIn):
    id: int


class UserRequest(BaseModel):
    """
    Represents a the parameters needed to create a new user
    """

    username: str
    password: str


class UserResponse(BaseModel):
    """
    Represents a user, with the password not included
    """

    id: int
    username: str
    first_name: str
    last_name: str
    age: int
    phone: str


class UserWithPw(BaseModel):
    """
    Represents a user with password included
    """

    id: int
    username: str
    first_name: str
    last_name: str
    age: int
    phone: str
    password: str

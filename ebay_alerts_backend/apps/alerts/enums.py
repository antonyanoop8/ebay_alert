from enum import Enum


class TimeInterval(Enum):
    two_mins = '2 mins'
    ten_mins = '10 mins'
    thirty_mins = '30 mins'


class SetupStatus(Enum):
    active = 'Active'
    disabled = 'Disabled'
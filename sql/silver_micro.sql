create table city
(
    id         int auto_increment
        primary key,
    name       varchar(255) not null,
    department int          not null
);

create table cooking_type
(
    id   int auto_increment
        primary key,
    name varchar(50) not null
);

create table customer
(
    id         int auto_increment
        primary key,
    firstname  varchar(255) null,
    lastname   varchar(255) null,
    role       varchar(255) not null,
    email      varchar(255) not null,
    password   varchar(255) not null,
    avatar     varchar(255) null,
    created_at datetime     not null,
    update_at  datetime          null
);

create table customer_favorite
(
    id          int auto_increment
        primary key,
    customer_id int      not null,
    created_at  datetime not null,
    updated_at  datetime null,
    constraint customer_favorite_customer_id_fk
        foreign key (customer_id) references customer (id)
);

alter table customer
    add constraint customer_customer_favorite_customer_id_fk
        foreign key (id) references customer_favorite (customer_id)
            on delete cascade;

create table dishes
(
    id   int auto_increment
        primary key,
    name varchar(255) not null
);

create table frame_ambience
(
    id   int auto_increment
        primary key,
    name varchar(255) not null
);

create table `order`
(
    id            int auto_increment
        primary key,
    restaurant_id int      not null,
    customer_id   int      not null,
    date          datetime not null,
    seat          int      not null,
    start_at      datetime not null,
    end_at        datetime not null,
    created_at    datetime not null,
    updated_at    datetime null,
    constraint order_customer_id_fk
        foreign key (customer_id) references customer (id)
);

create table restaurant
(
    id            int auto_increment
        primary key,
    name          varchar(255) not null,
    seat          int          not null,
    description   text         null,
    close_monday  tinyint(1)   not null,
    close_tuesday tinyint(1)   not null,
    opening_time  time         not null,
    closing_time  time         not null,
    address       varchar(255) null
);

create table city_restaurant
(
    restaurant_id int not null,
    city_id       int not null,
    constraint city_restaurant_city_id_fk
        foreign key (city_id) references city (id)
            on delete cascade,
    constraint city_restaurant_restaurant_id_fk
        foreign key (restaurant_id) references restaurant (id)
            on delete cascade
);

create table cooking_type_restaurant
(
    restaurant_id   int not null,
    cooking_type_id int not null,
    constraint cooking_type_restaurant_cooking_type_id_fk
        foreign key (cooking_type_id) references cooking_type (id),
    constraint cooking_type_restaurant_restaurant_id_fk
        foreign key (restaurant_id) references restaurant (id)
            on update cascade on delete cascade
);

create table dishes_restaurant
(
    restaurant_id int not null,
    dishes_id     int not null,
    constraint dishes_restaurant_dishes_id_fk
        foreign key (dishes_id) references dishes (id)
            on delete cascade,
    constraint dishes_restaurant_restaurant_id_fk
        foreign key (restaurant_id) references restaurant (id)
            on delete cascade
);

create table frame_ambience_restaurant
(
    restaurant_id     int not null,
    frame_ambience_id int not null,
    constraint frame_ambience_restaurant_frame_ambience_id_fk
        foreign key (frame_ambience_id) references frame_ambience (id)
            on delete cascade,
    constraint frame_ambience_restaurant_restaurant_id_fk
        foreign key (restaurant_id) references restaurant (id)
            on delete cascade
);

create table restaurant_menu
(
    id            int auto_increment
        primary key,
    name          varchar(255) not null,
    description   text         not null,
    price         float        null,
    status        varchar(50)  not null,
    restaurant_id int          not null,
    constraint restaurant_menu_restaurant_id_fk
        foreign key (restaurant_id) references restaurant (id)
);

create table restaurant_photo
(
    id            int auto_increment
        primary key,
    filename      varchar(255) not null,
    restaurant_id int          not null,
    created_at    datetime     not null,
    constraint restaurant_photo_restaurant_id_fk
        foreign key (restaurant_id) references restaurant (id)
);

create table review
(
    id            int auto_increment
        primary key,
    restaurant_id int      not null,
    comment       text     null,
    customer_id   int      not null,
    rating        float    null,
    created_at    datetime not null,
    updated_at    datetime null
);

create table reply
(
    id          int auto_increment
        primary key,
    review_id   int      null,
    comment     text     null,
    customer_id int      not null,
    created_at  datetime not null,
    updated_at  datetime null,
    constraint reply_review_id_fk
        foreign key (review_id) references review (id)
            on delete set null
);

create table parent_child_reply
(
    parent_review_id int null,
    child_reply_id   int null,
    constraint parent_child_reply_reply_id_fk
        foreign key (child_reply_id) references reply (id)
            on delete set null,
    constraint parent_child_reply_review_id_fk
        foreign key (parent_review_id) references review (id)
            on delete set null
);


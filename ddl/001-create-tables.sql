create table if not exists courier_tracking.couriers
(
    id   bigint auto_increment
    primary key,
    name varchar(255) null
);

create table if not exists courier_tracking.stores
(
    id   bigint auto_increment
    primary key,
    lat  double       null,
    lng  double       null,
    name varchar(255) null
);

create table if not exists courier_tracking.location_log
(
    id         bigint auto_increment
    primary key,
    lat        double      not null,
    lng        double      not null,
    timestamp  datetime(6) null,
    courier_id bigint      not null,
    constraint FKk7cdlvfnajyr5qxxf7sxo9hax
    foreign key (courier_id) references courier_tracking.couriers (id)
);

create table if not exists courier_tracking.store_visit_log
(
    id         bigint auto_increment
    primary key,
    entry_time datetime(6) null,
    courier_id bigint      null,
    store_id   bigint      null,
    constraint FKa3hm54116fej77p9n6lxprprx
    foreign key (courier_id) references courier_tracking.couriers (id),
    constraint FKqfcf6629w0xf8hcd9pnex4ffh
    foreign key (store_id) references courier_tracking.stores (id)
);
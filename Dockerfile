FROM php:8.1-apache

# Install composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install packages
RUN apt-get update && apt-get install -y \
    zip \
    curl \
    sudo \
    unzip \
    libicu-dev \
    libbz2-dev \
    libpng-dev \
    libjpeg-dev \
    libmcrypt-dev \
    libreadline-dev \
    libfreetype6-dev \
    g++

# Common PHP Extensions
RUN docker-php-ext-install \
    bz2 \
    intl \
    iconv \
    bcmath \
    opcache \
    calendar \
    pdo_mysql
RUN pecl install -o -f redis && docker-php-ext-enable redis

# Install mysql client
RUN apt-get install -y default-mysql-client

# Apache configuration
ENV APP_ROOT_PATH=/var/www/html
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
RUN echo "\nServerName localhost\n" >> /etc/apache2/apache2.conf
RUN a2enmod rewrite headers

# Copy source code
COPY . ${APP_ROOT_PATH}

# Copy PHP config
COPY php8.1.ini ${PHP_INI_DIR}/php.ini

WORKDIR ${APP_ROOT_PATH}

CMD ["apache2-foreground"]

EXPOSE 80

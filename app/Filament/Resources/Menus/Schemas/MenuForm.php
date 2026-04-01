<?php

namespace App\Filament\Resources\Menus\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class MenuForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                TextInput::make('slug')
                    ->required(),
                TextInput::make('price')
                    ->required()
                    ->numeric()
                    ->prefix('$'),
                TextInput::make('discount_price')
                    ->numeric()
                    ->default(null)
                    ->prefix('$'),
                FileUpload::make('image')
                    ->image(),
                Textarea::make('description')
                    ->default(null)
                    ->columnSpanFull(),
                TextInput::make('category_id')
                    ->required()
                    ->numeric(),
                Toggle::make('is_available')
                    ->required(),
                Toggle::make('is_featured')
                    ->required(),
                TextInput::make('preparation_time')
                    ->numeric()
                    ->default(null),
                TextInput::make('rating')
                    ->required()
                    ->numeric()
                    ->default(0),
            ]);
    }
}

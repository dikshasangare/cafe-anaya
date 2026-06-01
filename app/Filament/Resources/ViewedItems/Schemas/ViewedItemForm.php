<?php

namespace App\Filament\Resources\ViewedItems\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ViewedItemForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('user_id')
                    ->numeric()
                    ->default(null),
                TextInput::make('session_id')
                    ->default(null),
                TextInput::make('menu_id')
                    ->required()
                    ->numeric(),
                TextInput::make('action')
                    ->required()
                    ->default('view'),
            ]);
    }
}

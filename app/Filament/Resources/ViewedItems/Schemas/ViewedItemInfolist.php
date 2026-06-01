<?php

namespace App\Filament\Resources\ViewedItems\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class ViewedItemInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('user_id')
                    ->numeric()
                    ->placeholder('-'),
                TextEntry::make('session_id')
                    ->placeholder('-'),
                TextEntry::make('menu_id')
                    ->numeric(),
                TextEntry::make('action'),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}

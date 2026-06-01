<?php

namespace App\Filament\Resources\ViewedItems;

use App\Filament\Resources\ViewedItems\Pages\CreateViewedItem;
use App\Filament\Resources\ViewedItems\Pages\EditViewedItem;
use App\Filament\Resources\ViewedItems\Pages\ListViewedItems;
use App\Filament\Resources\ViewedItems\Pages\ViewViewedItem;
use App\Filament\Resources\ViewedItems\Schemas\ViewedItemForm;
use App\Filament\Resources\ViewedItems\Schemas\ViewedItemInfolist;
use App\Filament\Resources\ViewedItems\Tables\ViewedItemsTable;
use App\Models\ViewedItem;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ViewedItemResource extends Resource
{
    protected static ?string $model = ViewedItem::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'ViewItem';

    public static function form(Schema $schema): Schema
    {
        return ViewedItemForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return ViewedItemInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ViewedItemsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListViewedItems::route('/'),
            'create' => CreateViewedItem::route('/create'),
            'view' => ViewViewedItem::route('/{record}'),
            'edit' => EditViewedItem::route('/{record}/edit'),
        ];
    }
}

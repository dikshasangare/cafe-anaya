<?php

namespace App\Filament\Resources\ViewedItems\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ViewedItemsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('menu.name')
                    ->label('Menu Item')
                    ->searchable(),

                TextColumn::make('action')
                    ->badge()
                    ->color(fn($state) => match ($state) {
                        'view'  => 'info',
                        'order' => 'success',
                        'like'  => 'warning',
                        default => 'gray',
                    }),

                TextColumn::make('session_id')
                    ->label('Session')
                    ->limit(16)
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('created_at')
                    ->label('When')
                    ->since()
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
